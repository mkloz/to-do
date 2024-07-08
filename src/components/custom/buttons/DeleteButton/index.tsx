import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.css';
import { FlowbiteTrashBinOutline } from '../../../icons';

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onDelete?: () => void;
}

export default function DeleteButton({
  onDelete,
  ...props
}: DeleteButtonProps) {
  return (
    <button
      {...props}
      className={clsx(styles.btn, props.className)}
      onClick={() => onDelete?.()}
      title="Delete"
    >
      <FlowbiteTrashBinOutline />
    </button>
  );
}
