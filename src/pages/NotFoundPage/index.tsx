import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

function NotFoundPage() {
  const nav = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>404</h1>
        <div>
          <h3>Not Found</h3>
          <h5
            onClick={() => {
              nav(-1);
            }}
          >
            Go back
          </h5>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;
