import NavBar from './Navbar';
import styles from './index.module.css';
import { Outlet } from 'react-router-dom';

function ContentLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles['content-layout']}>
      <NavBar />
      <main>
        {children}
        <Outlet />
      </main>
    </div>
  );
}
export default ContentLayout;
