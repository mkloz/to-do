import React, { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  const checkboxId = React.useId();

  return (
    <>
      <input
        type="checkbox"
        id={checkboxId}
        className={styles['checkbox-input']}
        {...props}
      />
      <label htmlFor={checkboxId} className={styles['checkmark']}></label>
    </>
  );
}
