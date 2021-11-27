import { USER_1, USER_2, USER_3 } from './users';
import { v4 } from 'uuid';
import { datatype, lorem, random } from 'faker';
import dayjs from 'dayjs';

function recent7days() {
  const max = new Date().getTime();
  const min = dayjs().subtract(7, 'd').toDate().getTime();
  return datatype.datetime({ min, max });
}

function messageGenerator(users: { id: string }[]) {
  return {
    message: [
      {
        type: 'paragraph',
        children: [
          { text: lorem.sentences(datatype.number({ max: 3, min: 1 })) },
        ],
      },
    ],
    createdUserId: random.arrayElement(users).id,
    createdDate: recent7days(),
  };
}

export const THREAD_1 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_1, USER_2],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_1, USER_2])),
};
export const THREAD_2 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_1, USER_3],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_1, USER_3])),
};
export const THREAD_3 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_2, USER_3],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_2, USER_3])),
};
export const THREAD_4 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_1],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_1])),
};
export const THREAD_5 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_2],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_2])),
};
export const THREAD_6 = {
  id: v4(),
  isGroup: false,
  name: null,
  users: [USER_3],
  messages: new Array(4).fill({}).map(() => messageGenerator([USER_3])),
};

// group chat, add when necessary
export const THREAD_7 = {
  id: v4(),
  isGroup: true,
  name: 'valor launchpad',
  users: [USER_1, USER_2, USER_3],
  messages: new Array(12)
    .fill({})
    .map(() => messageGenerator([USER_1, USER_2, USER_3])),
};

export const THREADS = [
  THREAD_1,
  THREAD_2,
  THREAD_3,
  THREAD_4,
  THREAD_5,
  THREAD_6,
  THREAD_7,
];
