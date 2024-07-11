import { IProject, ITask } from '@/types/projects';
import {
  BasilAddOutline,
  FlowbiteTrashBinOutline,
  MdiClockPlusOutline,
} from '@/components/icons';
import styles from './index.module.css';
import React from 'react';
import { useBoolean, useToggle } from 'react-use';
import ContentEditable from '@/components/forms/ContentEditable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskMockApiService } from '@/__mock__/services/TaskMockApiService';
import { RandomUtils } from '@/utils/RandomUtils';
import clsx from 'clsx';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import { Checkbox } from '../../ui/checkbox';
import Popover from '../../ui/popover';
import dayjs from '../../../lib/dayjs';
import { Color } from '../../../utils/ColorUtils';
import CreateDueDatesForm from '../../forms/CreateDueDates';
import Tooltip from '../../ui/tooltip';

interface TaskProps {
  task: ITask;
  onUpdate?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
}

function getColorWarning(task: ITask) {
  if (dayjs(task.dueDates?.start).isBetween(dayjs(), dayjs().add(2, 'hour'))) {
    return Color.GREEN;
  }
  if (dayjs().isBetween(task.dueDates?.start, task.dueDates?.end)) {
    return Color.YELLOW;
  }
  if (dayjs().isAfter(task.dueDates?.end)) {
    return Color.RED;
  }
  return Color.PURPLE;
}

function Task({ task, onUpdate, onDelete }: TaskProps) {
  const [isDone, toggleDone] = useToggle(task.isDone);
  const [editable, toggleEditable] = useBoolean(false);
  const [content, setContent] = React.useState(task.name);
  const [datesIsOpen, toggleDatesIsOpen] = useBoolean(false);
  const eventDuration = dayjs.duration(
    dayjs(task.dueDates?.end).diff(task.dueDates?.start, 'minute'),
    'minute',
  );

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
      <Checkbox onChange={onDone} checked={isDone} />
      <ContentEditable
        style={{ textDecoration: isDone ? 'line-through' : '' }}
        isEditable={editable}
        value={task.name}
        className={styles['task-content']}
        onValueChange={setContent}
        onBlur={onSaveChanges}
        onDoubleClick={toggleEditable}
        placeholder="Task description"
      />
      <div className={styles['btns']}>
        <Tooltip tip={'Edit task'}>
          <EditButton
            editable={editable}
            toggleEditable={toggleEditable}
            onSaveChanges={onSaveChanges}
            className={styles['update-task']}
            title="Edit task"
          />
        </Tooltip>
        <Tooltip tip={'Delete task'}>
          <DeleteButton
            className={styles['delete-task']}
            onDelete={() => onDelete?.(task)}
          >
            <FlowbiteTrashBinOutline />
          </DeleteButton>
        </Tooltip>
        <Tooltip
          tip={
            task.dueDates
              ? dayjs(task.dueDates?.start).fromNow()
              : 'Add due dates'
          }
        >
          <Popover
            isOpen={datesIsOpen}
            onClickOutside={toggleDatesIsOpen}
            content={
              <CreateDueDatesForm task={task} onSubmitted={toggleDatesIsOpen} />
            }
          >
            {
              <button
                onClick={toggleDatesIsOpen}
                style={{
                  color: getColorWarning(task),
                }}
              >
                {task.dueDates ? (
                  eventDuration.humanize()
                ) : (
                  <MdiClockPlusOutline />
                )}
              </button>
            }
          </Popover>
        </Tooltip>
      </div>
    </div>
  );
}

export function generateEmptyTask(): ITask {
  return {
    id: RandomUtils.getRandomInt(1, Number.MAX_SAFE_INTEGER),
    name: '',
    isDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
interface TasksProps {
  project: IProject;
  newTemplate?: Omit<ITask, 'id'>;
}
export default function Tasks({
  project,
  newTemplate = generateEmptyTask(),
}: TasksProps) {
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
    mutationFn: (task: Omit<ITask, 'id'>) =>
      taskMockApiService.create(task, project.id),
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
            createTask.mutateAsync(newTemplate);
          }}
        >
          <BasilAddOutline />
          <span>Add task</span>
        </button>
      </li>
    </ul>
  );
}
