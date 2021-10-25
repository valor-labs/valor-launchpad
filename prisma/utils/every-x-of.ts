import dayjs from 'dayjs';

export function everydayOfYear(day?: Date) {
  const thisYear = (day ?? new Date()).getFullYear();
  return new Array(365).fill(null).map((_, index) => {
    return dayjs(`${thisYear}-01-01`, { utc: true }).add(index, 'd').toDate();
  });
}

export function everyMonthOfYear(day?: Date) {
  const thisYear = (day ?? new Date()).getFullYear();
  return new Array(13).fill(null).map((_, index) => {
    return dayjs(`${thisYear}-01-15`, { utc: true })
      .add(index, 'month')
      .toDate();
  });
}
