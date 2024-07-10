import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITask } from '../../../types/projects';
import styles from './index.module.css';
import { taskMockApiService } from '../../../__mock__/services/TaskMockApiService';
import dayjs from 'dayjs';

export interface ICreateDueDatesFormProps {
  task: ITask;
  onSubmitted?: () => void;
}

interface ICreateDueDatesFormValues {
  start: string;
  end: string;
}

export default function CreateDueDatesForm({
  task,
  onSubmitted,
}: ICreateDueDatesFormProps) {
  const form = useForm<ICreateDueDatesFormValues>();
  const queryClient = useQueryClient();
  const createDates = useMutation({
    mutationFn: async (task: ITask) => taskMockApiService.update(task),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit((data) => {
        createDates.mutateAsync({
          ...task,
          dueDates: { start: data.start, end: data.end },
        });
        onSubmitted?.();
      })}
    >
      <div>
        <span>
          {task.dueDates
            ? dayjs(task.dueDates?.start).fromNow()
            : 'No time limit'}
        </span>
        <label>
          Start at:
          <input
            type="datetime-local"
            placeholder="Start time"
            defaultValue={dayjs(task.dueDates?.start).format(
              'YYYY-MM-DDTHH:mm',
            )}
            {...form.register('start')}
          />
        </label>
        <label>
          End at:
          <input
            type="datetime-local"
            placeholder="End time"
            defaultValue={dayjs(task.dueDates?.end).format('YYYY-MM-DDTHH:mm')}
            {...form.register('end', {
              validate: (value) =>
                dayjs(value).isAfter(form.getValues('start')) ||
                'End time should be greater than start time',
            })}
          />
        </label>
        <div className={styles.errors}>
          {Object.entries(form.formState.errors).map(([key, value]) => (
            <span key={key}>{value.message}</span>
          ))}
        </div>
        {task.dueDates && (
          <button
            type="button"
            onClick={() => {
              createDates.mutateAsync({
                ...task,
                dueDates: undefined,
              });
              onSubmitted?.();
            }}
          >
            Delete
          </button>
        )}
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
