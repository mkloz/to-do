import { clsx } from 'clsx';
import { ITag } from '../../../types/projects';
import { BasilAddOutline, LucideTag } from '../../icons';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { RandomUtils } from '../../../utils/RandomUtils';
import { FC, useMemo, useRef } from 'react';
import Popover from '../../ui/popover';
import { useBoolean } from 'react-use';

interface TagsProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  selectedTag?: ITag | null;
  onTagSelect?: (tag: ITag) => void;
  addTagForm?: FC;
}

function Tags({
  tags,
  selectedTag,
  onTagSelect,
  addTagForm: AddTagForm,
  ...props
}: TagsProps) {
  const elementRef = useRef<HTMLLIElement>(null);
  const [isPopoverOpen, toggle] = useBoolean(false);

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
          <Popover isOpen={isPopoverOpen} popoverContent={<AddTagForm />}>
            <button onClick={toggle}>
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
