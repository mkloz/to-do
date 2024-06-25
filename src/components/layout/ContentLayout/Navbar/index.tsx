import React from 'react';
import ThemeSwitcher from '../../../ui/toggle/ThemeSwitcher';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Logo,
  MaterialSymbolsDoubleArrowRounded,
  MaterialSymbolsSearch,
} from '@/components/icons';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint';
import NavbarLinks from './NavbarLinks';
import { useBoolean } from 'react-use';

function Search() {
  return (
    <div className={styles.search}>
      <button>
        <MaterialSymbolsSearch width="1.3rem" height="1.3rem" />
      </button>
      <input type="search" placeholder="Search" />
    </div>
  );
}

function NavBar() {
  const b = useBreakpoint();
  const [isCollapsed, toggleCollapsed] = useBoolean(
    b === Breakpoint.MOBILE || b === Breakpoint.TABLET,
  );

  React.useEffect(() => {
    toggleCollapsed(b === Breakpoint.MOBILE || b === Breakpoint.TABLET);
  }, [b]);

  return (
    <aside
      className={clsx({
        [styles.sidebar]: true,
        [styles['sidebar--hidden']]: isCollapsed,
      })}
    >
      <nav className={styles.navbar}>
        <div className={styles['top-bar']}>
          <Link to={'/'}>
            <Logo />
          </Link>
          <button onClick={() => toggleCollapsed()}>
            <MaterialSymbolsDoubleArrowRounded
              className={styles.arrow}
              width="1.3rem"
              height="1.3rem"
            />
          </button>
        </div>
        <Search />
        {isCollapsed && (
          <button onClick={() => toggleCollapsed()}>
            <MaterialSymbolsDoubleArrowRounded width="1.3rem" height="1.3rem" />
          </button>
        )}
        <NavbarLinks />
        <div className={styles.bottom}>
          <img
            src="/default-avatar.png"
            width="2.5rem"
            height="2.5rem"
            alt="Avatar"
            className={styles.avatar}
          />
          <p>Username</p>
          <ThemeSwitcher />
        </div>
      </nav>
    </aside>
  );
}

export default NavBar;
