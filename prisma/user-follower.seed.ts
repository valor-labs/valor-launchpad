import {PrismaClient, Prisma} from '@prisma/client';

export class UserFollowerSeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    // find users
    const user1 = await this.prisma.userEntity.findFirst({where: {username: 'user1'}});
    const otherUsers = await this.prisma.userEntity.findMany({
      select: { id: true },
      where: { username: {not: 'user1'} }
    });

    // create user-follower relations seed data
    const relations = otherUsers.map<Prisma.SocialUserFollowerUncheckedCreateInput>(u => ({
      userId: u.id,
      followerId: user1.id,
    }));

    // insert
    for (const item of relations) {
      await this.prisma.socialUserFollower.upsert({
        create: item,
        update: {},
        where: { userId_followerId: item }
      })
    }
  }
}
