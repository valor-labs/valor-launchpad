import { Prisma } from '@prisma/client';
import * as Faker from 'faker';

const thisTear = new Date().getFullYear();

function dateAdd(d: Date, duration: number): Date {
  const res = d;
  res.setDate(d.getDate() + duration);
  return res;
}

export const ANALYTIC_OVERVIEW: Prisma.AnalyticOverviewCreateManyInput[] =
  new Array(365).fill(null).map((i, index) => {
    return {
      date: dateAdd(new Date(`${thisTear}-01-01`), index),
      bounce: Faker.datatype.float({ min: 1, max: 100 }),
      bounceRatio: Faker.datatype.float({ min: -1, max: 1.5 }),
      realTime: Faker.datatype.float({ min: 1, max: 100 }),
      realTimeRatio: Faker.datatype.float({ min: -1, max: 1.5 }),
      visitors: Faker.datatype.float({ min: 1, max: 100 }),
      visitorsRatio: Faker.datatype.float({ min: -1, max: 1.5 }),
    };
  });
