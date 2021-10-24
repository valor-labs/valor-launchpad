import { Prisma } from '@prisma/client';
import { everydayOfYear } from '../utils';
import dayjs from 'dayjs';
import { sources } from './source.data';
import { datatype } from 'faker';

const monthly: Prisma.DashboardDefaultMonthlyRevenueCreateManyInput[] = [];
const daily: Prisma.DashboardDefaultDailyRevenueCreateManyInput[] = [];

const iter = (source: string) => (date: Date) => {
  const revenue = datatype.float({ min: 10, max: 25, precision: 0.01 });
  daily.push({ source, date, revenue });

  const hitMonth = monthly.find(
    (i) =>
      dayjs(i.month).get('month') === dayjs(date).get('month') &&
      dayjs(i.month).get('year') === dayjs(date).get('year')
  );
  if (hitMonth) {
    (hitMonth.revenue as number) += revenue;
  } else {
    monthly.push({
      month: dayjs(`${date.getFullYear()}-${dayjs(date).get('month') + 1}-15`, {
        utc: true,
      }).toDate(),
      revenue,
    });
  }
};

for (const source of sources) {
  everydayOfYear(dayjs().subtract(1, 'year').toDate()).forEach(iter(source));
  everydayOfYear().forEach(iter(source));
}

export { monthly, daily };
