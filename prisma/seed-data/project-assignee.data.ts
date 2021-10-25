import { Prisma } from '@prisma/client';
import { PROJECTS } from './project.data';
import { random } from 'faker';
import { USERS } from './users';

export const PROJECT_ASSIGNEES: Prisma.ProjectsAssigneeEntityCreateManyInput[] =
  PROJECTS.map((project) => ({
    userId: random.arrayElement(USERS).id,
    projectsId: project.id,
  }));
