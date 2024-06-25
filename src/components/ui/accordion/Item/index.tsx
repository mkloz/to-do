import { Children, HTMLAttributes, ReactElement } from 'react';
import { AccordionItemContent, AccordionItemContentProps } from './content';
import {
  AccordionItemHeaderNonInteractiveProps,
  AccordionItemHeaderProps,
} from './header';
import React from 'react';
import { clsx } from 'clsx';
import { useToggle } from 'react-use';
import styles from './index.module.css';
import { AccordionItemProvider } from './context.provider';

interface AccordionItemProps extends HTMLAttributes<HTMLLIElement> {
  defaultCollapsed?: boolean;
  onCollapse?: () => void;
  children:
    | [
        ReactElement<
          AccordionItemHeaderProps | AccordionItemHeaderNonInteractiveProps
        >,
        ReactElement<AccordionItemContentProps>,
      ]
    | ReactElement<
        AccordionItemHeaderProps | AccordionItemHeaderNonInteractiveProps
      >;
}

export function AccordionItem({
  children,
  defaultCollapsed = true,
  onCollapse,
  ...props
}: AccordionItemProps) {
  const hasContent = Children.toArray(children).some(
    (child) =>
      React.isValidElement<AccordionItemContentProps>(child) &&
      child.type === AccordionItemContent &&
      child.props.children,
  );
  const [isCollapsed, toggle] = useToggle(defaultCollapsed);

  return (
    <AccordionItemProvider
      onCollapse={() => {
        toggle();
        onCollapse?.();
      }}
    >
      <li
        role="group"
        {...props}
        className={clsx(styles['item'], props.className, {
          [styles.collapsed]: isCollapsed,
          [styles['item--is-empty']]: !hasContent,
        })}
      >
        {children}
      </li>
    </AccordionItemProvider>
  );
}
