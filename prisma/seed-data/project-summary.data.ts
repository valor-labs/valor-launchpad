import { Prisma } from '@prisma/client';
import { PROJECTS } from './project.data';
import { date, random, datatype } from 'faker';
import { USERS } from './users';

export const PROJECT_SUMMARIES: Prisma.ProjectSummaryEntityCreateManyInput[] =
  PROJECTS.map((project) => ({
    project_id: project.id,
    createdDate: date.past(),
    startDate: date.past(),
    endDate: date.past(),
    reporting_user_id: random.arrayElement(USERS).id,
    budget: datatype.number({ min: 5000, max: 100000 }),
    logged: datatype.number({ min: 10, max: 1000 }) + 'h',
    estimated: datatype.number({ min: 10, max: 1000 }) + 'h',
  }));
