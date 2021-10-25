import { Prisma } from '@prisma/client';
import { EMPLOYER_1, EMPLOYER_2, EMPLOYER_3 } from './employer.data';
import { USER1_PROFILE, USER2_PROFILE, USER3_PROFILE } from './profile.data';

export const EMPLOYER_PROFILES: Prisma.ProfileEmployerEntityCreateManyInput[] =
  [
    {
      employerId: EMPLOYER_1.id,
      profileId: USER1_PROFILE.id,
      current: true,
    },
    {
      employerId: EMPLOYER_2.id,
      profileId: USER2_PROFILE.id,
      current: true,
    },
    {
      employerId: EMPLOYER_3.id,
      profileId: USER3_PROFILE.id,
      current: true,
    },
  ];
