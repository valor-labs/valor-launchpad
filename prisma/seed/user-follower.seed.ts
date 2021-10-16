import { PrismaClient } from '@prisma/client';
import { USER_FOLLOWERS } from '../seed-data/user-follower.data';
import { Seeder } from './seeder';

export class UserFollowerSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return this.prisma.socialUserFollower.createMany({
      data: USER_FOLLOWERS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.socialUserFollower.deleteMany();
  }
}
