import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { PROJECT_SUMMARIES } from '../seed-data/project-summary.data';

export class ProjectSummarySeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.projectSummaryEntity.createMany({
      data: PROJECT_SUMMARIES,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.projectSummaryEntity.deleteMany();
  }
}
