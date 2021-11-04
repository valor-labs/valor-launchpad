import { Prisma } from '@prisma/client';
import {
  USER_1,
  USER_2,
  USER_3,
} from './users';
import {
  USER_1_FOLLOW_USER_2,
  USER_1_FOLLOW_USER_3,
} from './user-follower.data';
import { STORY_1, STORY_2, STORY_3, STORY_4 } from './story.data';

export const SOCIAL_ACTIVITIES: Prisma.SocialActivityCreateManyInput[] = [
  {
    id: 1,
    operatorId: USER_1.id,
    action: 'FOLLOWED',
    targetUserId: USER_2.id,
    createdDate: USER_1_FOLLOW_USER_2.createdDate,
  },
  {
    id: 2,
    operatorId: USER_1.id,
    action: 'FOLLOWED',
    targetUserId: USER_3.id,
    createdDate: USER_1_FOLLOW_USER_3.createdDate,
  },
  {
    id: 3,
    operatorId: USER_1.id,
    action: 'POST_STORY',
    storyId: STORY_4.id,
    createdDate: STORY_4.createdDate,
  },
  {
    id: 4,
    operatorId: USER_2.id,
    action: 'POST_STORY',
    storyId: STORY_3.id,
    createdDate: STORY_3.createdDate,
  },
  {
    id: 5,
    operatorId: USER_3.id,
    action: 'POST_STORY',
    storyId: STORY_2.id,
    createdDate: STORY_2.createdDate,
  },
  {
    id: 6,
    operatorId: USER_1.id,
    action: 'POST_STORY',
    storyId: STORY_1.id,
    createdDate: STORY_1.createdDate,
  },
  {
    id: 7,
    operatorId: USER_2.id,
    action: 'LIKED_STORY',
    targetUserId: USER_3.id,
    createdDate: STORY_2.createdDate,
  },
];
