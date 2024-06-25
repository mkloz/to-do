import { clsx } from 'clsx';
import { ITag } from '../../../types/projects';
import { LucideTag } from '../../icons';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

interface TagsProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  selectedTag?: ITag | null;
  onTagSelect?: (tag: ITag) => void;
}

function Tags({ tags, selectedTag, onTagSelect, ...props }: TagsProps) {
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
    </ul>
  );
}

export default Tags;
