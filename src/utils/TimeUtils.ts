export enum DayTime {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening',
  NIGHT = 'Night',
}

export class TimeUtils {
  static getDayTime(): DayTime {
    const hours = new Date().getHours();

    if (hours > 22 || hours < 5) {
      return DayTime.NIGHT;
    }
    if (hours >= 5 && hours < 12) {
      return DayTime.MORNING;
    }
    if (hours >= 12 && hours < 17) {
      return DayTime.AFTERNOON;
    }
    return DayTime.EVENING;
  }
  static timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
