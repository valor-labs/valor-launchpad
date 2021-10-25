import { Prisma } from '@prisma/client';
import { company } from 'faker';
import { v4 } from 'uuid';

export const EMPLOYER_1 = { id: v4(), name: company.companyName() };
export const EMPLOYER_2 = { id: v4(), name: company.companyName() };
export const EMPLOYER_3 = { id: v4(), name: company.companyName() };

export const EMPLOYERS: Prisma.EmployerEntityCreateManyInput[] = [
  EMPLOYER_1,
  EMPLOYER_2,
  EMPLOYER_3,
];
