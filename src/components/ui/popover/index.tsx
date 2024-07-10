import { ReactElement } from 'react';
import {
  Popover as PopoverContainer,
  ArrowContainer,
  PopoverProps,
} from 'react-tiny-popover';
import styles from './index.module.css';

export interface TooltipProps extends Omit<PopoverProps, 'content'> {
  content: ReactElement;
}

export default function Popover({ children, content, ...props }: TooltipProps) {
  return (
    <PopoverContainer
      positions={['top', 'bottom', 'right', 'left']}
      padding={3}
      reposition
      align="center"
      {...props}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'currentColor'}
          arrowSize={7}
          arrowClassName={styles.arrow}
        >
          <div className={styles.popover}>{content}</div>
        </ArrowContainer>
      )}
    >
      {children}
    </PopoverContainer>
  );
}
