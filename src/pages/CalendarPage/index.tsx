import Calendar from '@/components/ui/calendar';
import { Breakpoint, useBreakpoint } from '../../hooks/useBreakpoint';

function CalendarPage() {
  const b = useBreakpoint();

  return (
    <Calendar
      startDate={new Date()}
      range={b == Breakpoint.MOBILE || b == Breakpoint.TABLET ? 0 : 1}
    />
  );
}

export default CalendarPage;
