import { PrismaClient } from '@prisma/client';
import { daily } from './seed-data/dashboard-default-revenue.data';

export class DashboardDefaultDailyRevenueSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.dashboardDefaultDailyRevenue.deleteMany();
    await this.prisma.dashboardDefaultDailyRevenue.createMany({
      data: daily,
    })
  }
}
