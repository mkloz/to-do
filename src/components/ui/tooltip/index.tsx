import { useBoolean } from 'react-use';
import Popover, { TooltipProps } from '../popover';
import styles from './index.module.css';

interface ToltipProps extends Omit<TooltipProps, 'isOpen' | 'content'> {
  tip: string | React.ReactNode;
}

export default function Tooltip({ children, tip, ...props }: ToltipProps) {
  const [isOpen, toggle] = useBoolean(false);

  return (
    <Popover
      {...props}
      isOpen={isOpen}
      content={<span className={styles.tip}>{tip}</span>}
    >
      <span
        onMouseEnter={() => toggle(true)}
        onMouseLeave={() => toggle(false)}
        className={styles.trigger}
      >
        {children}
      </span>
    </Popover>
  );
}
