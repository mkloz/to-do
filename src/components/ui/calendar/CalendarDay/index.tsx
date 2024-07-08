import styles from './index.module.css';
import dayjs from '@/lib/dayjs';
import React, { useRef, useState } from 'react';
import { useEffectOnce, useInterval } from 'react-use';
import clsx from 'clsx';
import { Color, ColorUtils } from '@/utils/ColorUtils';
import { Dayjs } from 'dayjs';
import { projectMockApiService } from '../../../../__mock__/services/ProjectMockApiService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ITask } from '../../../../types/projects';
import { HashLink } from 'react-router-hash-link';

function formatHour(date: Date | Dayjs | string) {
  return dayjs(date).format('h:mm A');
}

function CalendarDay({ day }: { day: Date }) {
  const markerRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const colorGenerator = ColorUtils.getColorGenerator();
  const projects = useSuspenseQuery({
    queryKey: ['projects', day.toISOString()],
    queryFn: () => projectMockApiService.getTodaysProjects(day),
  });
  const tasks = projects.data
    .reduce((prev, current) => {
      current.tasks.forEach((el) => prev.push(el));
      return prev;
    }, new Array<ITask>())
    .sort((a, b) => {
      return a.dueDates &&
        b.dueDates &&
        dayjs(a.dueDates.start).diff(dayjs(a.dueDates.end)) <
          dayjs(b.dueDates.start).diff(dayjs(b.dueDates.end))
        ? -1
        : 1;
    });

  useEffectOnce(() => {
    if (markerRef.current && dayRef.current && dayjs(day).isToday()) {
      dayRef.current.scrollTo({
        top:
          markerRef.current.offsetTop -
          dayRef.current.clientHeight / 2 -
          markerRef.current.clientHeight,
        behavior: 'smooth',
      });
    }
  });
  return (
    <div
      className={clsx(styles['calendar-day'], {
        [styles['purple-color']]: dayjs(day).isToday(),
      })}
      ref={dayRef}
    >
      <div>
        {dayjs(day).isToday() && <CalendarNowMarker ref={markerRef} />}
        {new Array(24).fill(null).map((_, i) => (
          <CalendarHour
            key={i}
            day={dayjs(day).startOf('day').add(i, 'hour').toDate()}
          />
        ))}
        {tasks.map((event, i) => (
          <CalendarEvent
            key={i}
            task={event}
            day={day}
            color={colorGenerator.next().value || Color.GREEN}
          />
        ))}
      </div>
    </div>
  );
}

function CalendarHour({ day }: { day: Date }) {
  return (
    <div className={styles['calendar-hour']}>
      <span>{formatHour(day)}</span>
      <hr />
    </div>
  );
}

interface CalendarEventProps {
  task: ITask;
  color?: Color;
  day: Date;
}

function CalendarEvent({ task, color, day }: CalendarEventProps) {
  if (
    !task.dueDates ||
    dayjs(task.dueDates.start).isAfter(task.dueDates.end) ||
    (!dayjs(task.dueDates.start).isSame(day, 'day') &&
      !dayjs(task.dueDates.end).isSame(day, 'day'))
  ) {
    return null;
  }

  const minutesFromStartOfDay = dayjs(task.dueDates.start).diff(
    dayjs(task.dueDates.start).startOf('day'),
    'minute',
  );
  const proportion = (minutesFromStartOfDay / MINUTES_IN_DAY) * 100;
  const indentTop = Math.max(proportion, 0);
  let eventHeight = Math.min(
    (dayjs(task.dueDates.end).diff(task.dueDates.start, 'minute') /
      MINUTES_IN_DAY) *
      100,
    100 - indentTop,
  );

  if (proportion < 0) {
    eventHeight = eventHeight + proportion;
  }

  return (
    <div
      className={clsx(styles['calendar-event'], {
        [styles['small-event']]: eventHeight < 4,
      })}
      style={{
        height: `${eventHeight}%`,
        top: `${indentTop}%`,
        color,
      }}
    >
      <HashLink smooth to={`/projects#task-${task.id}`}>
        <h5>
          {`${formatHour(task.dueDates.start)} -
        ${formatHour(task.dueDates.end)}`}
        </h5>
        <p>{task.name}</p>
      </HashLink>
    </div>
  );
}

const ONE_SECOND = 1000;
const MINUTES_IN_DAY = 1440;

const CalendarNowMarker = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const [now, setNow] = useState(dayjs());
  const minutesFromStartOfDay = now.diff(dayjs().startOf('day'), 'minute');

  useInterval(() => setNow(dayjs()), ONE_SECOND);
  return (
    <div
      ref={ref}
      className={styles['calendar-now-marker']}
      style={{
        top: `${(minutesFromStartOfDay / MINUTES_IN_DAY) * 100}%`,
      }}
    >
      <span>{formatHour(now)}</span>
      <hr />
    </div>
  );
});

export default CalendarDay;
