import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './index.module.css';

export interface AccordionItemContentProps
  extends HTMLAttributes<HTMLDivElement> {}

export function AccordionItemContent({
  children,
  ...props
}: AccordionItemContentProps) {
  return (
    <div {...props} className={clsx(styles['content'], props.className)}>
      <div>{children}</div>
    </div>
  );
}
