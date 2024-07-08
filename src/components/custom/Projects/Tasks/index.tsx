import { IProject, ITask } from '@/types/projects';
import {
  BasilAddOutline,
  FlowbiteTrashBinOutline,
  MaterialSymbolsSave,
  MynauiEditOne,
} from '@/components/icons';
import styles from './index.module.css';
import React from 'react';
import { useBoolean, useToggle } from 'react-use';
import ContentEditable from '@/components/forms/ContentEditable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskMockApiService } from '@/__mock__/services/TaskMockApiService';
import { RandomUtils } from '@/utils/RandomUtils';
import clsx from 'clsx';
import EditButton from '../../buttons/EditButton';
import DeleteButton from '../../buttons/DeleteButton';

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
        placeholder="Task description"
      />
      <EditButton
        editable={editable}
        toggleEditable={toggleEditable}
        onSaveChanges={onSaveChanges}
        className={styles['update-task']}
        title="Edit task"
      />
      <DeleteButton
        className={styles['delete-task']}
        onDelete={() => onDelete?.(task)}
      >
        <FlowbiteTrashBinOutline />
      </DeleteButton>
    </div>
  );
}

function generateEmptyTask(): ITask {
  return {
    id: RandomUtils.getRandomInt(1, Number.MAX_SAFE_INTEGER),
    name: '',
    isDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export default function Tasks({ project }: { project: IProject }) {
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
    <ul className={styles.tasks}>
      {project.tasks.map((task) => (
        <li key={task.id}>
          <Task
            task={task}
            onDelete={deleteTask.mutateAsync}
            onUpdate={updateTask.mutateAsync}
          />
        </li>
      ))}
      <li className={clsx(styles['new-task'])}>
        <button
          onClick={() => {
            createTask.mutateAsync(generateEmptyTask());
          }}
        >
          <BasilAddOutline />
          <span>Add task</span>
        </button>
      </li>
    </ul>
  );
}
