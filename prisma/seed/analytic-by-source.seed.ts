import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from '../utils';
import { datatype } from 'faker';
import { Seeder } from './seeder';

export class AnalyticBySourceSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticRevenueBySource.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticRevenueBySource.deleteMany();
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
