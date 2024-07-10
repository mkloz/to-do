import { PajamasError } from '../../../icons';
import styles from './index.module.css';

function CantLoadError() {
  return (
    <div className={styles.error}>
      <div>
        <PajamasError />
        <h4>Can't load data</h4>
      </div>
    </div>
  );
}
export default CantLoadError;
