import { PrismaClient } from '@prisma/client';
import { monthly } from '../seed-data/dashboard-default-revenue.data';
import { Seeder } from './seeder';

export class DashboardDefaultMonthlyRevenueSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.dashboardDefaultMonthlyRevenue.createMany({
      data: monthly,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.dashboardDefaultMonthlyRevenue.deleteMany();
  }
}
