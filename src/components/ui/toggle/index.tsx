import { InputHTMLAttributes, useId } from 'react';
import styles from './index.module.css';
import { CarbonCircleFilled } from '@/components/icons/CarbonCircleFilled';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Toggle({ onToggle, ...props }: ToggleProps) {
  const id = useId();

  return (
    <>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        onChange={onToggle}
        {...props}
      />
      <label htmlFor={id} className={styles.toggle}>
        <CarbonCircleFilled className={styles.ball} />
      </label>
    </>
  );
}
export default Toggle;
