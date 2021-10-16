import { Prisma } from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './users';

export const USER_EVENTS: Prisma.UserEventsEntityCreateManyInput[] = [
  {
    event: 'Create Event',
    target_user_id: USER_1.id,
    acting_user_id: USER_1.id,
  },
  {
    event: 'A second Event',
    target_user_id: USER_1.id,
    acting_user_id: USER_1.id,
  },
  {
    event: 'A third Event',
    target_user_id: USER_1.id,
    acting_user_id: USER_2.id,
  },
  {
    event: 'Create Event',
    target_user_id: USER_2.id,
    acting_user_id: USER_1.id,
  },
  {
    event: 'Create Event',
    target_user_id: USER_3.id,
    acting_user_id: USER_1.id,
  },
];
