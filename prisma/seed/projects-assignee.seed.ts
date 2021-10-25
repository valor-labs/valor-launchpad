import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { PROJECT_ASSIGNEES } from '../seed-data/project-assignee.data';

export class ProjectsAssigneeSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.projectsAssigneeEntity.createMany({
      data: PROJECT_ASSIGNEES,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.projectsAssigneeEntity.deleteMany();
  }
}
