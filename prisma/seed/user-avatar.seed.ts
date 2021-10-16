import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import {
  USER1_AVATAR,
  USER2_AVATAR,
  USER3_AVATAR,
  USER_1,
  USER_2,
  USER_3,
} from '../seed-data/users';

export class UserAvatarSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    const users = await this.prisma.mediaAsset.findMany({});
    return await this.prisma.mediaAsset.createMany({
      data: [USER1_AVATAR, USER2_AVATAR, USER3_AVATAR],
    });
  }

  async delete(): Promise<unknown> {
    return this.prisma.mediaAsset.deleteMany({
      where: { user_id: { in: [USER_1.id, USER_2.id, USER_3.id] } },
    });
  }
}
