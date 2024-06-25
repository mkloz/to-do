import { Theme, useTheme } from '@/store/useThemeStore';
import { TwemojiSun } from '@/components/icons/TwemojiSun';
import { FaSolidMoon } from '@/components/icons/FaSolidMoon';
import styles from './index.module.css';
import { RandomUtils } from '@/utils/RandomUtils';
import { useMemo } from 'react';

function ThemeSwitcher() {
  const theme = useTheme();
  const id = useMemo(() => RandomUtils.generateId(), []);

  return (
    <>
      <input
        type="checkbox"
        id={id}
        onChange={theme.inverse}
        className={styles.checkbox}
        checked={theme.theme === Theme.DARK}
      />

      <label htmlFor={id} className={styles['switch-label']}>
        <FaSolidMoon className={styles.moon} />
        <TwemojiSun className={styles.sun} />
      </label>
    </>
  );
}
export default ThemeSwitcher;
