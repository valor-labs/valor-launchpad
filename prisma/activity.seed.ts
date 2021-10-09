import { PrismaClient, Prisma, UserEntity } from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './seed-data/users';
import { USER_1_FOLLOW_USER_2, USER_1_FOLLOW_USER_3 } from './seed-data/user-follower.data';
import { STORY_1, STORY_2, STORY_3, STORY_4 } from './seed-data/story.data';

export class ActivitySeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const users = await this.prisma.userEntity.findMany();
    let user1: UserEntity;
    let user2: UserEntity;
    let user3: UserEntity;
    for (const user of users) {
      if (user.username === USER_1.username) {
        user1 = user;
      } else if (user.username === USER_2.username) {
        user2 = user;
      } else if (user.username === USER_3.username) {
        user3 = user;
      }
    }

    const activities: Prisma.SocialActivityUncheckedCreateInput[] = [
      {
        id: 1,
        operatorId: user1.id,
        operatorFullName: `${user1.firstName} ${user1.lastName}`,
        operatorAvatarSrc: USER_1.avatar.connectOrCreate.create.src,
        action: 'FOLLOWED',
        targetUserId: user2.id,
        targetUserFullName: `${user2.firstName} ${user2.lastName}`,
        targetUserAvatarSrc: USER_2.avatar.connectOrCreate.create.src,
        createdDate: USER_1_FOLLOW_USER_2.createdDate,
      },
      {
        id: 2,
        operatorId: user1.id,
        operatorFullName: `${user1.firstName} ${user1.lastName}`,
        operatorAvatarSrc: USER_1.avatar.connectOrCreate.create.src,
        action: 'FOLLOWED',
        targetUserId: user3.id,
        targetUserFullName: `${user3.firstName} ${user3.lastName}`,
        targetUserAvatarSrc: USER_3.avatar.connectOrCreate.create.src,
        createdDate: USER_1_FOLLOW_USER_3.createdDate,
      },
      {
        id: 3,
        operatorId: user1.id,
        operatorFullName: `${user1.firstName} ${user1.lastName}`,
        operatorAvatarSrc: USER_1.avatar.connectOrCreate.create.src,
        action: 'POST_STORY',
        storyId: STORY_4.id,
        createdDate: STORY_4.createdDate,
      },
      {
        id: 4,
        operatorId: user2.id,
        operatorFullName: `${user2.firstName} ${user2.lastName}`,
        operatorAvatarSrc: USER_2.avatar.connectOrCreate.create.src,
        action: 'POST_STORY',
        storyId: STORY_3.id,
        createdDate: STORY_3.createdDate,
      },
      {
        id: 5,
        operatorId: user3.id,
        operatorFullName: `${user3.firstName} ${user3.lastName}`,
        operatorAvatarSrc: USER_3.avatar.connectOrCreate.create.src,
        action: 'POST_STORY',
        storyId: STORY_2.id,
        createdDate: STORY_2.createdDate,
      },
      {
        id: 6,
        operatorId: user1.id,
        operatorFullName: `${user1.firstName} ${user1.lastName}`,
        operatorAvatarSrc: USER_1.avatar.connectOrCreate.create.src,
        action: 'POST_STORY',
        storyId: STORY_1.id,
        createdDate: STORY_1.createdDate,
      },
      {
        id: 7,
        operatorId: user2.id,
        operatorFullName: `${user2.firstName} ${user2.lastName}`,
        operatorAvatarSrc: USER_2.avatar.connectOrCreate.create.src,
        action: 'LIKED_STORY',
        targetUserId: user3.id,
        targetUserFullName: `${user3.firstName} ${user3.lastName}`,
        targetUserAvatarSrc: USER_3.avatar.connectOrCreate.create.src,
        createdDate: STORY_2.createdDate,
      },
    ];

    for (const act of activities) {
      await this.prisma.socialActivity.upsert({
        create: act,
        update: {},
        where: {id: act.id},
      })
    }
  }
}
