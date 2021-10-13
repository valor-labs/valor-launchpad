import { PrismaClient, Prisma } from '@prisma/client';
import { datatype } from 'faker';
import { everyMonthOfYear } from '../utils';
import { Seeder } from './seeder';

export class AnalyticByPlatformSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticByPlatformMonthly.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticByPlatformMonthly.deleteMany();
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
