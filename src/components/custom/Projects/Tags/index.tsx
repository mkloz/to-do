import { clsx } from 'clsx';
import { IProject, ITag } from '../../../../types/projects';
import {
  BasilAddOutline,
  LucideTag,
  MaterialSymbolsClose,
} from '../../../icons';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { RandomUtils } from '../../../../utils/RandomUtils';
import { FC, useMemo, useRef } from 'react';
import Popover from '../../../ui/popover';
import { useBoolean } from 'react-use';
import { IAddTagFormProps } from '../../../forms/AddTagForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectMockApiService } from '../../../../__mock__/services/ProjectMockApiService';

interface TagsProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  selectedTag?: ITag | null;
  project: IProject;
  onTagSelect?: (tag: ITag) => void;
  addTagForm?: FC<IAddTagFormProps>;
  onTagDelete?: (tag: ITag) => void;
}

function Tags({
  tags,
  selectedTag,
  onTagSelect,
  addTagForm: AddTagForm,
  project,
  ...props
}: TagsProps) {
  const elementRef = useRef<HTMLLIElement>(null);
  const [isPopoverOpen, toggle] = useBoolean(false);
  const queryClient = useQueryClient();
  const tagDelete = useMutation({
    mutationFn: (tag: ITag) => projectMockApiService.removeTag(project.id, tag),
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
            [styles['tag--selected']]: selectedTag && tag.id === selectedTag.id,
          })}
          onClick={() => onTagSelect?.(tag)}
          style={{ color: tag.color }}
        >
          <Link to={`/tags?tag=${tag.name}`}>
            <LucideTag />
            {tag.name}
          </Link>
          <button onClick={() => tagDelete.mutateAsync(tag)}>
            <MaterialSymbolsClose />
          </button>
        </li>
      ))}
      {AddTagForm && (
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
            content={<AddTagForm project={project} onSubmitted={toggle} />}
          >
            <button type="submit" onClick={toggle}>
              <BasilAddOutline />
              Add Tag
            </button>
          </Popover>
        </li>
      )}
    </ul>
  );
}

export default Tags;
