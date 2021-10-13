import { Prisma } from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './users';

export const USER_1_FOLLOW_USER_2: Prisma.SocialUserFollowerCreateManyInput = {
  userId: USER_2.id,
  followerId: USER_1.id,
  createdDate: new Date('2021-05-01T12:34:56'),
};
export const USER_1_FOLLOW_USER_3: Prisma.SocialUserFollowerCreateManyInput = {
  userId: USER_3.id,
  followerId: USER_1.id,
  createdDate: new Date('2021-05-03T12:34:56'),
};

export const USER_FOLLOWERS = [USER_1_FOLLOW_USER_2, USER_1_FOLLOW_USER_3];
