import * as dayjs from 'dayjs';

export function getPrevPeriod(
  start: Date,
  end: Date
): { prevStart: Date; prevEnd: Date } {
  const diff = dayjs(end).diff(dayjs(start), 'd');
  const prevStart = dayjs(start).subtract(diff + 1, 'd');
  const prevEnd = dayjs(start).subtract(1, 'd');
  return {
    prevStart: prevStart.toDate(),
    prevEnd: prevEnd.toDate(),
  };
}
