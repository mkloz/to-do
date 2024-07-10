import dayjs from '@/lib/dayjs';
import styles from './index.module.css';
import Calendar from '../../components/ui/calendar';
import { Breakpoint, useBreakpoint } from '../../hooks/useBreakpoint';
import Projects from '../../components/custom/Projects';
import { useQuery } from '@tanstack/react-query';
import { projectMockApiService } from '../../__mock__/services/ProjectMockApiService';
import { FluentCompassNorthwest16Filled } from '../../components/icons';
import { Link } from 'react-router-dom';
import { TimeUtils } from '../../utils/TimeUtils';
import { generateEmptyTask } from '../../components/custom/Tasks';
import Fallback from '../../components/async/fallbacks/Fallback';

function NoProjectsFallback() {
  return (
    <div className={styles['no-projects-fallback']}>
      <div>
        <FluentCompassNorthwest16Filled />
        <div>
          <h4>No tasks for today 🎉</h4>
          <Link to={'/projects'}> Create tasks</Link>
        </div>
      </div>
    </div>
  );
}

function TodaysPage() {
  const b = useBreakpoint();
  const projects = useQuery({
    queryKey: ['projects', 'today'],
    queryFn: () => projectMockApiService.getTodaysProjects(),
  });

  const newTaskTemplate = {
    ...generateEmptyTask(),
    dueDates: {
      start: dayjs().toISOString(),
      end: dayjs().add(1, 'hour').toISOString(),
    },
  };

  return (
    <>
      <div className={styles.todays}>
        <div className={styles['todays--content']}>
          <div>
            <h1>Good {TimeUtils.getDayTime()}, User!👋</h1>
            <h4>It's {dayjs().format('dddd, MMM YY')}</h4>
          </div>
          <Fallback isError={projects.isError} isLoading={projects.isLoading}>
            {projects.data?.length === 0 ? (
              <NoProjectsFallback />
            ) : (
              <Projects
                projects={projects.data || []}
                newTaskTemplate={newTaskTemplate}
              />
            )}
          </Fallback>
        </div>
      </div>
      <Calendar
        startDate={new Date()}
        range={0}
        style={
          b == Breakpoint.TABLET || b == Breakpoint.MOBILE
            ? { display: 'none' }
            : undefined
        }
      />
    </>
  );
}

export default TodaysPage;
