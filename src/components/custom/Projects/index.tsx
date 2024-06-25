import { IProject, ITask } from '@/types/projects';
import {
  BasilAddOutline,
  CiCircle,
  FlowbiteTrashBinOutline,
  MaterialSymbolsSave,
  MynauiEditOne,
  UilStar,
} from '@/components/icons';
import styles from './index.module.css';
import React from 'react';
import { useBoolean, useToggle } from 'react-use';
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
import { taskMockApiService } from '../../../__mock__/services/TaskMockApiService';
import { RandomUtils } from '../../../utils/RandomUtils';
import clsx from 'clsx';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';

interface TaskProps {
  task: ITask;
  onUpdate?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
}

function Task({ task, onUpdate, onDelete }: TaskProps) {
  const checkboxId = React.useId();
  const [isDone, toggleDone] = useToggle(task.isDone);
  const [editable, toggleEditable] = useBoolean(false);
  const [content, setContent] = React.useState(task.name);

  const onDone = () => {
    toggleDone();
    onUpdate?.({ ...task, isDone: !isDone });
  };
  const onSaveChanges = () => {
    toggleEditable();
    onUpdate?.({ ...task, name: content });
  };

  return (
    <div className={styles.task} id={`task-${task.id}`}>
      <input
        type="checkbox"
        id={checkboxId}
        className={styles['checkbox-input']}
        checked={isDone}
        onChange={onDone}
      />
      <label htmlFor={checkboxId} className={styles['checkmark']}></label>
      <ContentEditable
        style={{ textDecoration: isDone ? 'line-through' : '' }}
        isEditable={editable}
        value={task.name}
        onValueChange={setContent}
        onBlur={onSaveChanges}
        onDoubleClick={toggleEditable}
      />
      <button
        onClick={toggleEditable}
        className={styles['update-task']}
        title="Edit task"
      >
        {editable ? (
          <MaterialSymbolsSave onClick={onSaveChanges} />
        ) : (
          <MynauiEditOne />
        )}
      </button>
      <button
        className={styles['delete-task']}
        onClick={() => onDelete?.(task)}
      >
        <FlowbiteTrashBinOutline />
      </button>
    </div>
  );
}

function Tasks({ project }: { project: IProject }) {
  const queryClient = useQueryClient();

  const deleteTask = useMutation({
    mutationFn: (task: ITask) => taskMockApiService.delete(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  const updateTask = useMutation({
    mutationFn: (task: ITask) => taskMockApiService.update(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const createTask = useMutation({
    mutationFn: (task: ITask) => taskMockApiService.create(task, project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return (
    <ul>
      {project.tasks.map((task) => (
        <li key={task.id}>
          <Task
            task={task}
            onDelete={deleteTask.mutateAsync}
            onUpdate={updateTask.mutateAsync}
          />
        </li>
      ))}
      <li>
        <div className={clsx(styles['new-task'])}>
          <button
            className={styles['add-task']}
            onClick={() => {
              const newTask: ITask = {
                id: RandomUtils.getRandomInt(1, Number.MAX_SAFE_INTEGER),
                name: '',
                isDone: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              createTask.mutateAsync(newTask);
            }}
          >
            <BasilAddOutline />
            <span>Add task</span>
          </button>
        </div>
      </li>
    </ul>
  );
}

function Project({ project }: { project: IProject }) {
  const queryClient = useQueryClient();
  const invertImportant = useMutation({
    mutationFn: () => projectMockApiService.toggleImportant(project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return (
    <AccordionItem
      className={styles.project}
      id={`project-${project.id}`}
      defaultCollapsed={false}
    >
      <AccordionItemHeaderNonInteractive>
        <div className={styles['project-header']}>
          <button onClick={() => invertImportant.mutateAsync()}>
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
          <HashLink to={`/projects#project-${project.id}`}>
            <h3>{project.name}</h3>
          </HashLink>
          <Tags tags={project.tags} />
        </div>
      </AccordionItemHeaderNonInteractive>
      <AccordionItemContent className={styles['project-content']}>
        <Tasks project={project} />
      </AccordionItemContent>
    </AccordionItem>
  );
}

export function Projects({ projects }: { projects: IProject[] }) {
  return (
    <AccordionBox>
      {projects.map((project) => (
        <Project project={project} key={project.id} />
      ))}
    </AccordionBox>
  );
}

export default Projects;
