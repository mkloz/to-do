import clsx from 'clsx';
import styles from './index.module.css';
import { HTMLAttributes } from 'react';

export function AccordionBox({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...props} className={clsx(styles.accordion, props.className)}>
      {children}
    </ul>
  );
}

export * from './Item/content';
export * from './Item/header';
export * from './Item';
