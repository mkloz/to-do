import {
  AlertType,
  Alert as IAlert,
  useAlertsStore,
} from '@/store/useAlertsStore';
import { MdiSuccessCircleOutline } from '@/components/icons/MdiSuccessCircleOutline';
import { PajamasError } from '@/components/icons/PajamasError';
import { MaterialSymbolsInfoOutline } from '@/components/icons/MaterialSymbolsInfoOutline';
import { IconamoonCloseBold } from '@/components/icons/IconamoonCloseBold';
import styles from './index.module.css';
import { useEffect } from 'react';
import { useInterval, useToggle } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { projectMockApiService } from '../../../__mock__/services/ProjectMockApiService';
import { ITask } from '../../../types/projects';
import dayjs from 'dayjs';
import { Alert as CAlert } from '@/store/useAlertsStore';

const icons: Record<AlertType, JSX.Element> = {
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
    const timeout = setTimeout(onClose, 7000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div key={alert.id} className={styles.alert} {...rest}>
      <div>{icons[alert.type] || icons[AlertType.INFO]}</div>
      <p className={styles.message}>{alert.message}</p>
      <button className={styles.close} onClick={onClose}>
        <IconamoonCloseBold />
      </button>
    </div>
  );
}

function Alerts() {
  const store = useAlertsStore();
  const [wasReminded, remind] = useToggle(false);
  const projects = useQuery({
    queryKey: ['projects', 'today'],
    queryFn: () => projectMockApiService.getTodaysProjects(),
  });

  const createReminder = (task: ITask) => {
    store.addAlert(
      new CAlert(
        `Event "${
          task.name.length > 15
            ? task.name.slice(0, 15).concat('...')
            : task.name
        }" 
        is ${dayjs(task.dueDates?.start).fromNow()}`,
        AlertType.INFO,
      ),
    );
  };
  const getTodaysTasks = () => {
    if (!projects.isSuccess) return [];

    return projects.data.reduce((acc, project) => {
      return acc.concat(project.tasks);
    }, new Array<ITask>());
  };

  useEffect(() => {
    if (projects.isSuccess && !wasReminded) {
      remind();
      return;
    }

    getTodaysTasks()
      .filter((task) =>
        dayjs(task.dueDates?.start).isBetween(
          dayjs(),
          dayjs().add(60, 'minute'),
        ),
      )
      .forEach((task) => createReminder(task));
  }, [projects.isSuccess, wasReminded]);

  useInterval(() => {
    getTodaysTasks()
      .filter(
        (task) =>
          dayjs(task.dueDates?.start).isSame(
            dayjs().add(30, 'minute'),
            'minute',
          ) ||
          dayjs(task.dueDates?.start).isSame(
            dayjs().add(15, 'minute'),
            'minute',
          ),
      )
      .forEach((task) => createReminder(task));
  }, 1000 * 45);
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
