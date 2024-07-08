import { IProject } from '@/types/projects';
import {
  BasilAddOutline,
  CiCircle,
  MynauiEditOne,
  UilStar,
} from '@/components/icons';
import styles from './index.module.css';
import { useBoolean } from 'react-use';
import {
  AccordionBox,
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeaderNonInteractive,
} from '@/components/ui/accordion';
import { Color } from '../../../utils/ColorUtils';
import Tags from '../Tags';
import { HashLink } from 'react-router-hash-link';
import ContentEditable from '../../forms/ContentEditable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';
import Tasks from './Tasks';
import EditButton from '../buttons/EditButton';
import { useState } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import { RandomUtils } from '../../../utils/RandomUtils';
import { clsx } from 'clsx';

function Project({ project }: { project: IProject }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState(project.name);
  const invertImportant = useMutation({
    mutationFn: () => projectMockApiService.toggleImportant(project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  const editProject = useMutation({
    mutationFn: (newProject: IProject) =>
      projectMockApiService.update(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  const deleteProject = useMutation({
    mutationFn: () => projectMockApiService.delete(project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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
            {project.isImportant ? (
              <UilStar
                style={{
                  color: Color.YELLOW,
                }}
              />
            ) : (
              <CiCircle
                style={{
                  color: Color.GREEN,
                }}
              />
            )}
          </button>
          {!editable ? (
            <HashLink
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
          <EditButton
            editable={editable}
            toggleEditable={toggleEditable}
            onSaveChanges={onSaveChanges}
          />
          <DeleteButton onDelete={() => deleteProject.mutateAsync()} />
          <Tags tags={project.tags} />
        </div>
      </AccordionItemHeaderNonInteractive>
      <AccordionItemContent className={styles['project-content']}>
        <Tasks project={project} />
      </AccordionItemContent>
    </AccordionItem>
  );
}
function generateEmptyProject(): IProject {
  return {
    id: RandomUtils.getRandomInt(1, Number.MAX_SAFE_INTEGER),
    name: 'New project',
    status: '',
    isImportant: false,
    createdAt: new Date().toISOString(),
    tasks: [],
    tags: [],
  };
}
export function Projects({ projects }: { projects: IProject[] }) {
  const queryClient = useQueryClient();
  const createProject = useMutation({
    mutationFn: (project: IProject) => projectMockApiService.create(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return (
    <AccordionBox>
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
      <button
        key={RandomUtils.generateId()}
        className={clsx(styles['new-project'])}
        onClick={() => {
          createProject.mutateAsync(generateEmptyProject());
        }}
      >
        <BasilAddOutline />
        <span>Add project</span>
      </button>
    </AccordionBox>
  );
}

export default Projects;
