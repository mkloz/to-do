import { IconamoonArrowLeft2Bold } from '../../../icons';
import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import styles from './index.module.css';
import { useAccordionItemContext } from './context.provider';
import React from 'react';

export interface AccordionItemHeaderProps
  extends HTMLAttributes<HTMLButtonElement> {}

export interface AccordionItemHeaderNonInteractiveProps
  extends HTMLAttributes<HTMLDivElement> {}

export function AccordionItemHeader({
  children,
  ...props
}: AccordionItemHeaderProps) {
  const accordionItemContext = useAccordionItemContext();

  return (
    <button
      {...props}
      className={clsx(styles['header'], props.className)}
      onClick={accordionItemContext.onCollapse}
    >
      {children}
      <IconamoonArrowLeft2Bold className={styles['icon']} />
    </button>
  );
}
export const AccordionItemHeaderNonInteractive = React.forwardRef<
  HTMLDivElement,
  AccordionItemHeaderNonInteractiveProps
>(function (
  { children, ...props }: AccordionItemHeaderNonInteractiveProps,
  ref,
) {
  const accordionItemContext = useAccordionItemContext();

  return (
    <div
      {...props}
      className={clsx(styles['header'], props.className)}
      ref={ref}
    >
      {children}
      <button
        onClick={accordionItemContext.onCollapse}
        style={{ color: 'currentcolor' }}
      >
        <IconamoonArrowLeft2Bold className={styles['icon']} />
      </button>
    </div>
  );
});
