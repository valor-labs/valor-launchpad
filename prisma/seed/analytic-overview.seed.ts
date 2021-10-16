import { PrismaClient } from '@prisma/client';
import { ANALYTIC_OVERVIEW } from '../seed-data/analytic-overview.data';
import { Seeder } from './seeder';

export class AnalyticOverviewSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticOverview.createMany({
      data: ANALYTIC_OVERVIEW,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticOverview.deleteMany();
  }
}
