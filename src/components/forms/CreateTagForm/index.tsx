import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagMockApiService } from '@/__mock__/services/TagMockApiService';
import { ITag } from '../../../types/projects';
import styles from './index.module.css';
import { Color } from '../../../utils/ColorUtils';
export interface ICreateTagFormProps {
  onSubmitted?: () => void;
}
interface IAddTagFormValues {
  name: string;
  color: string;
  createdAt: string;
}
export default function CreateTagForm({ onSubmitted }: ICreateTagFormProps) {
  const form = useForm<IAddTagFormValues>();
  const queryClient = useQueryClient();
  const createTag = useMutation({
    mutationFn: async (tag: Omit<ITag, 'id'>) => tagMockApiService.create(tag),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit((data) => {
        createTag.mutateAsync({
          name: data.name,
          color: data.color,
          createdAt: data.createdAt,
        });
        onSubmitted?.();
      })}
    >
      <div>
        <input
          type="text"
          placeholder="Tag name"
          {...form.register('name', {
            required: 'Tag name is required',
            minLength: {
              value: 1,
              message: 'Tag name must be at least 1 character',
            },
          })}
        />
        <input
          type="color"
          defaultValue={Color.PURPLE}
          {...form.register('color')}
        />
        <input
          type="hidden"
          value={new Date().toISOString()}
          {...form.register('createdAt')}
        />
        <div className={styles.errors}>
          {Object.entries(form.formState.errors).map(([key, value]) => (
            <span key={key}>{value.message}</span>
          ))}
        </div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
