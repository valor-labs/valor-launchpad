import { Prisma } from '@prisma/client';
import { random, lorem, datatype } from 'faker';
import { USER_1, USER_2, USER_3 } from './users';

function appointmentGenerator(userId: string): Prisma.AppointmentCreateManyInput {
  return {
    title: random.words(3),
    content: lorem.sentences(3),
    userId,
    createdDate: datatype.datetime({
      min: new Date('2020-01-01').getTime(),
      max: new Date().getTime(),
    }),
  };
}

export const APPOINTMENTS: Prisma.AppointmentCreateManyInput[] = [
  appointmentGenerator(USER_1.id),
  appointmentGenerator(USER_1.id),
  appointmentGenerator(USER_1.id),
  appointmentGenerator(USER_1.id),
  appointmentGenerator(USER_2.id),
  appointmentGenerator(USER_2.id),
  appointmentGenerator(USER_2.id),
  appointmentGenerator(USER_2.id),
  appointmentGenerator(USER_3.id),
  appointmentGenerator(USER_3.id),
  appointmentGenerator(USER_3.id),
  appointmentGenerator(USER_3.id),
];
