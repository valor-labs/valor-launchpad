import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { PROJECTS } from '../seed-data/project.data';

export class ProjectsSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.projectsEntity.createMany({
      data: PROJECTS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.projectsEntity.deleteMany();
  }
}
