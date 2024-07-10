import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isToday);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

export default dayjs;
