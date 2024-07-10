import { clsx } from 'clsx';
import { ITag } from '../../../types/projects';
import { BasilAddOutline, LucideTag } from '../../icons';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { RandomUtils } from '../../../utils/RandomUtils';
import { FC, useMemo, useRef } from 'react';
import Popover from '../../ui/popover';
import { useBoolean } from 'react-use';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagMockApiService } from '../../../__mock__/services/TagMockApiService';
import DeleteButton from '../buttons/DeleteButton';
import { ICreateTagFormProps } from '../../forms/CreateTagForm';

interface TagsListProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  selectedTags?: ITag[] | null;
  onTagSelect?: (tag: ITag) => void;
  createTagForm?: FC<ICreateTagFormProps>;
  isInteractive?: boolean;
  deletable?: boolean;
}

export default function TagsList({
  tags,
  selectedTags,
  onTagSelect,
  createTagForm: CreateTagForm,
  isInteractive = true,
  deletable = false,
  ...props
}: TagsListProps) {
  const elementRef = useRef<HTMLLIElement>(null);
  const [isPopoverOpen, toggle] = useBoolean(false);
  const queryClient = useQueryClient();
  const tagDelete = useMutation({
    mutationFn: async (tagId: number) => await tagMockApiService.delete(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
  return (
    <ul {...props} className={clsx(styles.tags, props.className)}>
      {tags.map((tag) => (
        <li
          key={tag.id}
          className={clsx(styles.tag, {
            [styles['tag--selected']]:
              selectedTags && selectedTags.some((el) => tag.id === el.id),
          })}
          onClick={() => onTagSelect?.(tag)}
          style={{ color: tag.color }}
        >
          {isInteractive ? (
            <Link to={`/tags?tag=${tag.name}`}>
              <LucideTag />
              {tag.name}
            </Link>
          ) : (
            <button type="button" onClick={(e) => e.preventDefault}>
              <LucideTag />
              {tag.name}
            </button>
          )}
          {deletable && (
            <DeleteButton
              onDelete={() => {
                tagDelete.mutateAsync(tag.id);
              }}
            />
          )}
        </li>
      ))}
      {CreateTagForm && (
        <li
          ref={elementRef}
          key={useMemo(() => RandomUtils.generateId(), [])}
          className={clsx(styles['new-tag'])}
          style={{
            opacity: isPopoverOpen ? 1 : undefined,
          }}
        >
          <Popover
            isOpen={isPopoverOpen}
            onClickOutside={toggle}
            content={<CreateTagForm onSubmitted={toggle} />}
          >
            <button type="submit" onClick={toggle}>
              <BasilAddOutline />
              Create Tag
            </button>
          </Popover>
        </li>
      )}
    </ul>
  );
}
