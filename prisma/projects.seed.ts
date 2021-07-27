import {PrismaClient} from '@prisma/client';
import * as Faker from 'faker';
import {ProjectsEntity} from '../apps/api/src/projects/projects.entity';
import {UserEntity} from '../libs/common-api/src';

export class ProjectsSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createProjects(users: Partial<UserEntity>[]) {
    const projects = new Array(20).fill(null)
      .map((project: ProjectsEntity) => {
        return project = <any>{
          rollupData: {
            income: {
              goal: Faker.datatype.number({min: 10000, max: 100000}),
              current: Faker.datatype.number({min: 10000, max: 100000}),
              status: Faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
            },
            orders: {
              goal: Faker.datatype.number({min: 10000, max: 100000}),
              current: Faker.datatype.number({min: 10000, max: 100000}),
              status: Faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
            },
            revenue: {
              goal: Faker.datatype.number({min: 10000, max: 100000}),
              current: Faker.datatype.number({min: 10000, max: 100000}),
              status: Faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
            },
            activity: {
              goal: Faker.datatype.number({min: 10000, max: 100000}),
              current: Faker.datatype.number({min: 10000, max: 100000}),
              status: Faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
            }
          },
          title: Faker.lorem.words(1),
          body: Faker.lorem.text(4),
          progress: Faker.datatype.number(10),
          badge: {
            title: Faker.random.arrayElement(['Finished', 'In Progress', 'Finished']),
            status: Faker.random.arrayElement(['bg-success', 'bg-danger', 'bg-warning']),
          },
          actions: [
            {
              title: 'Delete',
              type: 'fas fa-trash'
            },
            {
              title: 'Clone',
              type: 'far fa-copy'
            }
          ]
        }
      })
    return await this.prisma.projectsEntity.createMany({
      data: projects
    });
  }
}
