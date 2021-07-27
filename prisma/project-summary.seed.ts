import {PrismaClient} from '@prisma/client';
import * as Faker from 'faker';
import {ProjectsEntity} from '../apps/api/src/projects/projects.entity';
import {UserEntity} from '../libs/common-api/src';

export class ProjectSummarySeed {
  constructor(private prisma: PrismaClient) {
  }

  async createProjectSummaries(projects: Partial<ProjectsEntity>[], users: Partial<UserEntity>[]) {
    const projectSummaries = [];

    projects.map(async (project: any) => {
      projectSummaries.push({
        project_id: project.id,
        createdDate: Faker.date.past(),
        startDate: Faker.date.past(),
        endDate: Faker.date.past(),
        reporting_user_id: Faker.random.arrayElement(users).id,
        budget: Faker.datatype.number({min: 5000, max: 100000}),
        logged: Faker.datatype.number({min: 10, max: 1000}) + 'h',
        estimated: Faker.datatype.number({min: 10, max: 1000}) + 'h'
      })
      return
    })

    return await this.prisma.projectSummaryEntity.createMany({
      data: projectSummaries
    })
  }
}
