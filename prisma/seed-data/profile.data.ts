import { USER_1, USER_2, USER_3 } from './users';
import { address, random } from 'faker';

export const USER1_PROFILE = {
  id: 'd7b153e7-627d-4b9b-90cc-834cdd730430',
  username: USER_1.username,
  name: `${USER_1.firstName} ${USER_1.lastName}`,
  from: address.city(),
  title: random.word(),
  location: address.city(),
};

export const USER2_PROFILE = {
  id: 'b99dd4e0-9f4b-4098-ba83-8dd813374c5e',
  username: USER_2.username,
  name: `${USER_2.firstName} ${USER_2.lastName}`,
  from: address.city(),
  title: random.word(),
  location: address.city(),
};

export const USER3_PROFILE = {
  id: '665b2898-3305-408f-b4ba-c80dbf987214',
  username: USER_3.username,
  name: `${USER_3.firstName} ${USER_3.lastName}`,
  from: address.city(),
  title: random.word(),
  location: address.city(),
};

export const USER1_PROFILE_AVATAR = {
  profile_id: USER1_PROFILE.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar.jpg',
  alt: 'user1 profile avatar picture',
};

export const USER2_PROFILE_AVATAR = {
  profile_id: USER2_PROFILE.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar-2.jpg',
  alt: 'user2 profile avatar picture',
};

export const USER3_PROFILE_AVATAR = {
  profile_id: USER3_PROFILE.id,
  type: 'image/jpg',
  src: 'assets/img/avatars/avatar-3.jpg',
  alt: 'user3 profile avatar picture',
};

export const PROFILES = [USER1_PROFILE, USER2_PROFILE, USER3_PROFILE];
