import {
  IconamoonArrowLeft2Bold,
  IconamoonArrowRight2Bold as CinnamonArrowRight2Bold,
} from '@/components/icons';
import styles from './index.module.css';
import dayjs from '@/lib/dayjs';
import React, { Suspense, useMemo } from 'react';
import { useCounter } from 'react-use';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import CalendarDay from './CalendarDay';
import Loading from '../../async/loadings/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import CantLoadError from '../../async/errors/CantLoadError';

const DAYS_RANGE = 2;

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  startDate: Date;
  range: number;
}

function formatDay(date: Date | Dayjs) {
  return dayjs(date).format('D MMM, ddd');
}

function Calendar({ startDate, range = 0, ...rest }: CalendarProps) {
  if (range < 0) {
    range = 0;
  }
  const startDateDay = useMemo(() => dayjs(startDate).startOf('day'), []);
  const [current, { inc, dec }] = useCounter(0, DAYS_RANGE, -DAYS_RANGE);
  const date = startDateDay.add(current, 'day').toDate();

  return (
    <aside {...rest} className={clsx(styles.sidebar, rest.className)}>
      <div className={styles.calendar}>
        <div>
          <CalendarSwitcher
            date={date}
            onNext={() => inc()}
            onPrev={() => dec()}
            hasNext={current !== DAYS_RANGE}
            hasPrev={current !== -DAYS_RANGE}
            range={range}
          />
          <div className={styles['calendar-period']}>
            {new Array(range * 2 + 1).fill(null).map((_, i) => {
              const day = dayjs(date).add(i - range, 'day');

              return (
                <Suspense fallback={<Loading />} key={i}>
                  <ErrorBoundary fallback={<CantLoadError />}>
                    <div>
                      {!!range && <CalendarDate date={day.toDate()} />}
                      <CalendarDay day={day.toDate()} />
                    </div>
                  </ErrorBoundary>
                </Suspense>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

interface CalendarSwitcherProps {
  date: Date;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  range?: number;
}

function CalendarDate({ date }: { date: Date }) {
  return (
    <span
      className={clsx(styles['calendar-date'], {
        [styles['purple-color']]: dayjs(date).isToday(),
      })}
    >
      {formatDay(date)}
    </span>
  );
}

function CalendarSwitcher({
  date,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  range = 0,
}: CalendarSwitcherProps) {
  return (
    <div className={styles['calendar-switcher']}>
      <button
        onClick={onPrev}
        className={clsx({ [styles.disabled]: !hasPrev })}
      >
        <IconamoonArrowLeft2Bold />
      </button>
      <h4>
        {range == 0 ? (
          <CalendarDate date={date} />
        ) : (
          <>
            <CalendarDate date={dayjs(date).subtract(range, 'day').toDate()} />
            {' - '}
            <CalendarDate date={dayjs(date).add(range, 'day').toDate()} />
          </>
        )}
      </h4>
      <button
        onClick={onNext}
        className={clsx({ [styles.disabled]: !hasNext })}
      >
        <CinnamonArrowRight2Bold />
      </button>
    </div>
  );
}

export default Calendar;
