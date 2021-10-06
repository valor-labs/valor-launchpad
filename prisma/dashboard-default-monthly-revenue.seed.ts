import { PrismaClient } from '@prisma/client';
import { monthly } from './seed-data/dashboard-default-revenue.data';

export class DashboardDefaultMonthlyRevenueSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.dashboardDefaultMonthlyRevenue.deleteMany();
    await this.prisma.dashboardDefaultMonthlyRevenue.createMany({
      data: monthly,
    });
  }
}
