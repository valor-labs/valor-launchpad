import {Prisma} from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './users';

export const USER_1_FOLLOW_USER_2: Prisma.SocialUserFollowerCreateInput = {
  id: 'c6e43f9b-138e-432a-9e96-2c30d0e125be',
  user: {connect: {username: USER_2.username}},
  follower: {connect: {username: USER_1.username}},
  createdDate: new Date('2021-05-01T12:34:56'),
};
export const USER_1_FOLLOW_USER_3: Prisma.SocialUserFollowerCreateInput = {
  id: 'de9a1341-9fc1-4924-88fd-29d3dd0e74e5',
  user: {connect: {username: USER_3.username}},
  follower: {connect: {username: USER_1.username}},
  createdDate: new Date('2021-05-03T12:34:56'),
};

export const USER_FOLLOWERS = [
  USER_1_FOLLOW_USER_2,
  USER_1_FOLLOW_USER_3,
];
