import { PrismaClient, Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import { datatype } from 'faker';
import { Seeder } from './seeder';

export class AnalyticByInterestSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticByInterest.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticByInterest.deleteMany();
  }

  private generate() {
    const thisYear = new Date().getFullYear();
    const interests = ['Technology', 'Arts', 'Gaming', 'Media', 'Sports'];
    const data: Prisma.AnalyticByInterestCreateManyInput[] = [];

    for (const interest of interests) {
      new Array(365).fill(null).forEach((_, index) => {
        data.push({
          date: dayjs(`${thisYear}-01-01`, { utc: true })
            .add(index, 'd')
            .toDate(),
          interest,
          percentage: datatype.number({ min: 10, max: 99 }),
        });
      });
    }
    return data;
  }
}
