import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from '../utils';
import { datatype } from 'faker';
import { Seeder } from './seeder';

export class DashboardDefaultOverviewSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.dashboardDefaultOverview.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.dashboardDefaultOverview.deleteMany();
  }

  private generate() {
    const data: Prisma.DashboardDefaultOverviewCreateManyInput[] = [];
    everydayOfYear().forEach((date) => {
      data.push({
        date,
        totalEarnings: datatype.float({ min: 50, max: 100, precision: 0.01 }),
        pendingOrders: datatype.number(50),
        totalRevenue: datatype.float({ min: 50, max: 100, precision: 0.01 }),
      });
    });
    return data;
  }
}
