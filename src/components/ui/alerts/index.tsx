import { Alert as IAlert, useAlertsStore } from '@/store/useAlertsStore';
import { MdiSuccessCircleOutline } from '@/components/icons/MdiSuccessCircleOutline';
import { PajamasError } from '@/components/icons/PajamasError';
import { MaterialSymbolsInfoOutline } from '@/components/icons/MaterialSymbolsInfoOutline';
import { IconamoonCloseBold } from '@/components/icons/IconamoonCloseBold';
import { AlertType } from '@/types/ui';
import styles from './index.module.css';
import { useEffect } from 'react';

const icons = {
  [AlertType.SUCCESS]: (
    <MdiSuccessCircleOutline fill="green" className={styles.success} />
  ),
  [AlertType.ERROR]: <PajamasError fill="red" className={styles.error} />,
  [AlertType.WARNING]: (
    <PajamasError fill="yellow" className={styles.warning} />
  ),
  [AlertType.INFO]: (
    <MaterialSymbolsInfoOutline fill="blue" className={styles.info} />
  ),
};
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  alert: IAlert;
  onClose: () => void;
}

function Alert({ alert, onClose, ...rest }: AlertProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div key={alert.id} className={styles.alert} {...rest}>
      {icons[alert.type] || icons[AlertType.INFO]}
      <p className={styles.message}>{alert.message}</p>
      <button className={styles.close} onClick={onClose}>
        <IconamoonCloseBold />
      </button>
    </div>
  );
}

function Alerts() {
  const store = useAlertsStore();

  if (!store.alerts.length) return null;

  return (
    <div className={styles.alerts}>
      {store.alerts.map((alert) => (
        <Alert
          key={alert.id}
          alert={alert}
          onClose={() => store.removeAlert(alert.id)}
        />
      ))}
    </div>
  );
}
export default Alerts;
