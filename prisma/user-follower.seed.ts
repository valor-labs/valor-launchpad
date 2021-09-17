import { PrismaClient } from '@prisma/client';
import { USER_FOLLOWERS } from './seed-data/user-follower.data';

export class UserFollowerSeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    for (const item of USER_FOLLOWERS) {
      await this.prisma.socialUserFollower.upsert({
        create: item,
        update: {},
        where: { id: item.id }
      })
    }
  }
}
