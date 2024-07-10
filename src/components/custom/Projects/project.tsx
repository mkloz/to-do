import { IProject, ITask } from '@/types/projects';
import { CiCircle, UilStar } from '@/components/icons';
import styles from './index.module.css';
import { useBoolean } from 'react-use';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeaderNonInteractive,
} from '@/components/ui/accordion';
import { Color } from '../../../utils/ColorUtils';
import Tags from './Tags';
import { HashLink } from 'react-router-hash-link';
import ContentEditable from '../../forms/ContentEditable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';
import Tasks from '../Tasks';
import EditButton from '../buttons/EditButton';
import { useState } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import AddTagForm from '../../forms/AddTagForm';
import {
  Alert,
  AlertType,
  useAlertsStore,
} from '../../../store/useAlertsStore';
import Tooltip from '../../ui/tooltip';

interface ProjectProps {
  project: IProject;
  newTaskTemplate?: Omit<ITask, 'id'>;
}
export const Star = () => (
  <UilStar
    style={{
      color: Color.YELLOW,
    }}
  />
);

export const Circle = () => (
  <CiCircle
    style={{
      color: Color.GREEN,
    }}
  />
);
function Project({ project, newTaskTemplate }: ProjectProps) {
  const queryClient = useQueryClient();
  const alerts = useAlertsStore();
  const [content, setContent] = useState(project.name);
  const invertImportant = useMutation({
    mutationFn: () => projectMockApiService.toggleImportant(project.id),
    onSuccess: (isImportant) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alerts.addAlert(
        isImportant
          ? new Alert('Project is now important', AlertType.SUCCESS)
          : new Alert('Project is no longer important', AlertType.WARNING),
      );
    },
    onError: (error) => {
      alerts.addAlert(new Alert(error.message, AlertType.ERROR));
    },
  });
  const editProject = useMutation({
    mutationFn: (newProject: IProject) =>
      projectMockApiService.update(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alerts.addAlert(new Alert('Project renamed', AlertType.SUCCESS));
    },
    onError: (error) => {
      alerts.addAlert(new Alert(error.message, AlertType.ERROR));
    },
  });
  const deleteProject = useMutation({
    mutationFn: () => projectMockApiService.delete(project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      alerts.addAlert(new Alert('Project deleted', AlertType.SUCCESS));
    },
    onError: (error) => {
      alerts.addAlert(new Alert(error.message, AlertType.ERROR));
    },
  });
  const [editable, toggleEditable] = useBoolean(false);

  const onSaveChanges = () => {
    toggleEditable();
    editProject.mutateAsync({ ...project, name: content });
  };

  return (
    <AccordionItem
      className={styles.project}
      id={`project-${project.id}`}
      defaultCollapsed={false}
    >
      <AccordionItemHeaderNonInteractive>
        <div className={styles['project-header']}>
          <button
            onClick={() => invertImportant.mutateAsync()}
            className={styles['important-button']}
          >
            {project.isImportant ? <Star /> : <Circle />}
          </button>
          {!editable ? (
            <HashLink
              smooth
              to={`/projects#project-${project.id}`}
              className={styles['project-name']}
            >
              {project.name}
            </HashLink>
          ) : (
            <ContentEditable
              value={project.name}
              className={styles['project-name']}
              onValueChange={setContent}
              isEditable
              onBlur={onSaveChanges}
              placeholder="Project name"
            />
          )}
          <Tooltip tip={'Edit project'}>
            <EditButton
              editable={editable}
              toggleEditable={toggleEditable}
              onSaveChanges={onSaveChanges}
            />
          </Tooltip>
          <Tooltip tip={'Delete project'}>
            <DeleteButton onDelete={() => deleteProject.mutateAsync()} />
          </Tooltip>
          <Tags tags={project.tags} project={project} addTagForm={AddTagForm} />
        </div>
      </AccordionItemHeaderNonInteractive>
      <AccordionItemContent className={styles['project-content']}>
        <Tasks project={project} newTemplate={newTaskTemplate} />
      </AccordionItemContent>
    </AccordionItem>
  );
}

export default Project;
