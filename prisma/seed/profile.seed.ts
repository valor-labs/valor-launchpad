import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import {
  USER1_PROFILE,
  USER2_PROFILE,
  USER3_PROFILE,
} from '../seed-data/profile.data';

export class ProfileSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.profileEntity.createMany({
      data: [USER1_PROFILE, USER2_PROFILE, USER3_PROFILE],
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.profileEntity.deleteMany();
  }
}
