import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import {
  USER1_PROFILE,
  USER1_PROFILE_AVATAR,
  USER2_PROFILE,
  USER2_PROFILE_AVATAR,
  USER3_PROFILE,
  USER3_PROFILE_AVATAR,
} from '../seed-data/profile.data';

export class ProfileAvatarSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.mediaAsset.createMany({
      data: [USER1_PROFILE_AVATAR, USER2_PROFILE_AVATAR, USER3_PROFILE_AVATAR],
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.mediaAsset.deleteMany({
      where: {
        profile_id: {
          in: [USER1_PROFILE.id, USER2_PROFILE.id, USER3_PROFILE.id],
        },
      },
    });
  }
}
