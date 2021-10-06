import { PrismaClient } from '@prisma/client';
import { ANALYTIC_OVERVIEW } from './seed-data/analytic-overview.data';

export class AnalyticOverviewSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticOverview.deleteMany();
    await this.prisma.analyticOverview.createMany({
      data: ANALYTIC_OVERVIEW,
    });
  }
}
