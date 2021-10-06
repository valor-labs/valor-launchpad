import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from './utils';
import { datatype } from 'faker';

export class DashboardDefaultOverviewSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.dashboardDefaultOverview.deleteMany();
    await this.prisma.dashboardDefaultOverview.createMany({
      data: this.generate(),
    });
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
