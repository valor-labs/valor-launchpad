import { PrismaClient, Prisma } from '@prisma/client';
import { datatype } from 'faker';
import { everyMonthOfYear } from './utils';

export class AnalyticByPlatformSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticByPlatformMonthly.deleteMany();
    await this.prisma.analyticByPlatformMonthly.createMany({
      data: this.generate(),
    });
  }

  private generate() {
    const data: Prisma.AnalyticByPlatformMonthlyCreateManyInput[] = [];
    everyMonthOfYear().forEach((month) => {
      data.push({
        month,
        desktop: datatype.number({ min: 10, max: 80 }),
        mobile: datatype.number({ min: 10, max: 80 }),
      });
    });
    return data;
  }
}
