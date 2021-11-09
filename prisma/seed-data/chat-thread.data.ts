import { USER_1, USER_2, USER_3 } from './users';
import { v4 } from 'uuid';

export const THREAD_1 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_1, USER_2],
};
export const THREAD_2 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_1, USER_3],
};
export const THREAD_3 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_2, USER_3],
};

// group chat, add when necessary
// export const THREAD_4 = {
//   id: v4(),
//   isGroup: true,
//   name: 'valor launchpad',
//   users: [USER_1, USER_2, USER_3],
// };

export const THREADS = [THREAD_1, THREAD_2, THREAD_3];
