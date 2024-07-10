import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tagMockApiService } from '@/__mock__/services/TagMockApiService';
import { useState } from 'react';
import { IProject, ITag } from '../../../types/projects';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';
import TagsList from '../../custom/TagsList';
import styles from './index.module.css';
import Popover from '../../ui/popover';
import CreateTagForm from '../CreateTagForm';
import { useBoolean } from 'react-use';
import Fallback from '../../async/fallbacks/Fallback';

export interface IAddTagFormProps {
  project: IProject;
  onSubmitted?: () => void;
}

export default function AddTagForm({ project, onSubmitted }: IAddTagFormProps) {
  const form = useForm();
  const queryClient = useQueryClient();
  const tags = useQuery({
    queryKey: ['tags'],
    queryFn: async () =>
      (await tagMockApiService.getAll()).filter(
        (tag) => !project.tags.find((el) => el.id === tag.id),
      ),
  });
  const [isCreateTagFormOpen, toggleCreateTagForm] = useBoolean(false);
  const [selectedTags, select] = useState<ITag[]>([]);
  const addTags = useMutation({
    mutationFn: async (tags: ITag[]) => {
      for await (const tag of tags) {
        await projectMockApiService.addTag(project.id, tag);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={form.handleSubmit(() => {
        selectedTags?.length && addTags.mutateAsync(selectedTags);
        onSubmitted?.();
      })}
    >
      <div>
        <Fallback isError={tags.isError} isLoading={tags.isLoading}>
          <TagsList
            tags={tags.data || []}
            selectedTags={selectedTags}
            onTagSelect={(tag) =>
              select((tags) => {
                if (tags.includes(tag))
                  return tags.filter((el) => el.id !== tag.id);
                return [...tags, tag];
              })
            }
            isInteractive={false}
          />
        </Fallback>
        <Popover
          isOpen={isCreateTagFormOpen}
          onClickOutside={toggleCreateTagForm}
          positions={['right', 'left', 'top', 'bottom']}
          content={<CreateTagForm />}
          containerClassName={styles['create-tag-popover']}
        >
          <button
            type="button"
            className={styles['create-tag-button']}
            onClick={(e) => {
              e.preventDefault();
              toggleCreateTagForm();
            }}
          >
            Create
          </button>
        </Popover>

        <button type="submit">Add</button>
      </div>
    </form>
  );
}
