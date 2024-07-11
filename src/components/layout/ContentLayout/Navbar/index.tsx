import React from 'react';
import ThemeSwitcher from '../../../ui/toggle/ThemeSwitcher';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Logo,
  MaterialSymbolsDoubleArrowRounded,
  MaterialSymbolsSearch,
  OouiReload,
} from '@/components/icons';
import { Breakpoint, useBreakpoint } from '../../../../hooks/useBreakpoint';
import NavbarLinks from './NavbarLinks';
import { LocalStorageUtils } from '../../../../utils/LocalStorageUtils';

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

function NavBar({
  isCollapsed,
  toggleCollapsed,
}: {
  isCollapsed: boolean;
  toggleCollapsed?: (c?: boolean) => void;
}) {
  const b = useBreakpoint();
  return (
    <aside
      className={clsx({
        [styles.sidebar]: true,
        [styles['sidebar--hidden']]: isCollapsed,
      })}
      style={{
        width: !isCollapsed && b === Breakpoint.MOBILE ? '100%' : undefined,
      }}
    >
      <nav className={styles.navbar}>
        <div className={styles['top-bar']}>
          <Link to={'/'}>
            <Logo />
          </Link>
          <button
            className={styles.reload}
            onClick={() => {
              LocalStorageUtils.clear();
              window.location.reload();
            }}
          >
            <OouiReload width="1.3rem" height="1.3rem" />
          </button>
          <button onClick={() => toggleCollapsed?.()} className={styles.arrow}>
            <MaterialSymbolsDoubleArrowRounded width="1.3rem" height="1.3rem" />
          </button>
        </div>
        <Search />
        {isCollapsed && (
          <button onClick={() => toggleCollapsed?.()}>
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
