type DayName = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export function isToday(day: DayName, date: Date = new Date()): boolean {
  const DAYS: readonly DayName[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
  return DAYS[date.getDay()] === day;
}
export function timeToMinutes(value: string): number {
  if (!value || !value.includes(':')) return 0;
  const [hourStr, minuteStr] = value.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return 0;

  return hour * 60 + minute;
}
