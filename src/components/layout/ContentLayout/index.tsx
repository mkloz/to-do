import NavBar from './Navbar';
import styles from './index.module.css';
import { Outlet } from 'react-router-dom';
import { useBoolean } from 'react-use';
import { Breakpoint, useBreakpoint } from '../../../hooks/useBreakpoint';
import React from 'react';

function ContentLayout({ children }: { children?: React.ReactNode }) {
  const b = useBreakpoint();
  const [isCollapsed, toggleCollapsed] = useBoolean(
    b === Breakpoint.MOBILE || b === Breakpoint.TABLET,
  );

  React.useEffect(() => {
    toggleCollapsed(b === Breakpoint.MOBILE || b === Breakpoint.TABLET);
  }, [b]);

  return (
    <div className={styles['content-layout']}>
      <NavBar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
      <main
        style={{
          display: !isCollapsed && b === Breakpoint.MOBILE ? 'none' : undefined,
        }}
      >
        {children}
        <Outlet />
      </main>
    </div>
  );
}
export default ContentLayout;
