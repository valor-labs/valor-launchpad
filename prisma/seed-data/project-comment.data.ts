import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import { PROJECTS } from './project.data';
import { lorem, random, datatype } from 'faker';
import { USER_1, USER_2, USER_3 } from './users';

const PROJECT_COMMENTS: Prisma.CommentEntityCreateManyInput[] = [];

for (const project of PROJECTS) {
  const id = v4();
  PROJECT_COMMENTS.push({
    id,
    body: lorem.text(1),
    author_id: random.arrayElement([USER_1, USER_2, USER_3]).id,
    project_id: project.id,
  });
  const childrenCount = datatype.number(3);
  const children = Array.from({ length: childrenCount }, () => {
    return {
      body: lorem.text(1),
      author_id: random.arrayElement([USER_1, USER_2, USER_3]).id,
      parentId: id,
    };
  });
  PROJECT_COMMENTS.push(...children);
}

export { PROJECT_COMMENTS };
