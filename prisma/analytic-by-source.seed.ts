import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from './utils';
import { datatype } from 'faker';

export class AnalyticBySourceSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticRevenueBySource.deleteMany();
    await this.prisma.analyticRevenueBySource.createMany({
      data: this.generate(),
    });
  }

  generate() {
    const sources = ['Direct', 'Affiliate', 'E-mail', 'Other'];
    const data: Prisma.AnalyticRevenueBySourceCreateManyInput[] = [];
    for (const source of sources) {
      everydayOfYear().forEach((date) => {
        data.push({
          date,
          source,
          revenue: datatype.number({ min: 60, max: 1000 }),
        });
      });
    }
    return data;
  }
}
