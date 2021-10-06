import { Prisma } from '@prisma/client';
import { random, lorem, datatype } from 'faker';
import { USER_1, USER_2, USER_3 } from './users';

function appointmentGenerator(username: string): Prisma.AppointmentCreateInput {
  return {
    title: random.words(3),
    content: lorem.sentences(3),
    user: {
      connect: { username },
    },
    createdDate: datatype.datetime({
      min: new Date('2020-01-01').getTime(),
      max: new Date().getTime(),
    }),
  };
}

export const APPOINTMENTS: Prisma.AppointmentCreateInput[] = [
  appointmentGenerator(USER_1.username),
  appointmentGenerator(USER_1.username),
  appointmentGenerator(USER_1.username),
  appointmentGenerator(USER_1.username),
  appointmentGenerator(USER_2.username),
  appointmentGenerator(USER_2.username),
  appointmentGenerator(USER_2.username),
  appointmentGenerator(USER_2.username),
  appointmentGenerator(USER_3.username),
  appointmentGenerator(USER_3.username),
  appointmentGenerator(USER_3.username),
  appointmentGenerator(USER_3.username),
];
