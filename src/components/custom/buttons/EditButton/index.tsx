import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.css';
import { MaterialSymbolsSave, MynauiEditOne } from '../../../icons';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  editable: boolean;
  toggleEditable: () => void;
  onSaveChanges: () => void;
}

export default function EditButton({
  toggleEditable,
  onSaveChanges,
  editable,
  ...props
}: EditButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        toggleEditable();
      }}
      className={clsx(styles.btn, props.className)}
      title={editable ? 'Save changes' : 'Edit'}
    >
      {editable ? (
        <MaterialSymbolsSave onClick={onSaveChanges} />
      ) : (
        <MynauiEditOne />
      )}
      {props.children}
    </button>
  );
}
