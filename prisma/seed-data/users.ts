import { name } from 'faker';

export const USER_1 = {
  id: '9378df11-a4e3-48af-aa29-bb84894298e5',
  username: 'user1',
  email: 'user1@abc.com',
  firstName: name.firstName(),
  lastName: name.lastName(),
};

export const USER_2 = {
  id: 'c3187f08-6730-4d1f-95d4-9f001e2831fe',
  username: 'user2',
  email: 'user2@abc.com',
  firstName: name.firstName(),
  lastName: name.lastName(),
};

export const USER_3 = {
  id: '89286650-7f09-45cf-a2ce-b0a5f80977cd',
  username: 'user3',
  emailVerified: false,
  email: 'user3@abc.com',
  firstName: name.firstName(),
  lastName: name.lastName(),
};

export const USERS = [USER_1, USER_2, USER_3];

export const USER1_AVATAR = {
  user_id: USER_1.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar.jpg',
  alt: 'user1 avatar picture',
};

export const USER2_AVATAR = {
  user_id: USER_2.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar-2.jpg',
  alt: 'user2 avatar picture',
};

export const USER3_AVATAR = {
  user_id: USER_3.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar-3.jpg',
  alt: 'user3 avatar picture',
};
