import { PrismaClient } from '@prisma/client';
import { daily } from '../seed-data/dashboard-default-revenue.data';
import { Seeder } from './seeder';

export class DashboardDefaultDailyRevenueSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.dashboardDefaultDailyRevenue.createMany({
      data: daily,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.dashboardDefaultDailyRevenue.deleteMany();
  }
}
