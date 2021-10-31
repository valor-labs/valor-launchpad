import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  SOCIAL_FOLLOWED,
  SOCIAL_LIKED,
  SOCIAL_UNFOLLOWED,
  SOCIAL_UNLIKED,
  SocialLikedPayload,
} from './social-events.constant';

@Injectable()
export class DashboardSocialService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  /**
   * fetch all followings of user(userId)
   * @param userId
   * @param operatorUserId
   */
  async getAllFollowings(userId: string, operatorUserId: string) {
    const res = await this.prisma.socialUserFollower.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            profile: {
              include: {
                avatar: true,
              },
            },
            socialUserFollowing: {
              where: {
                followerId: operatorUserId,
                deletedDate: { equals: null },
              },
            },
          },
        },
      },
      where: {
        followerId: { equals: userId },
        deletedDate: { equals: null },
      },
    });
    return res.map((i) => {
      return {
        id: i.user.id,
        firstName: i.user.firstName,
        lastName: i.user.lastName,
        avatar: i.user.profile.avatar,
        followed: i.user.socialUserFollowing.length > 0,
      };
    });
  }

  async follow(userId: string, followerId: string) {
    const now = new Date();
    await this.prisma.socialUserFollower.upsert({
      create: { userId, followerId, createdDate: now },
      update: { createdDate: now, deletedDate: null },
      where: { userId_followerId: { userId, followerId } },
    });
    this.eventEmitter.emit(SOCIAL_FOLLOWED, {
      userId,
      operatorId: followerId,
      actionAt: now,
    });
  }

  async unfollow(userId: string, followerId: string) {
    const res = await this.prisma.socialUserFollower.delete({
      where: { userId_followerId: { userId, followerId } },
    });
    this.eventEmitter.emit(SOCIAL_UNFOLLOWED, {
      userId,
      operatorId: followerId,
      actionAt: new Date(),
    });
    return res;
  }

  async likeStory(storyId: string, operatorId: string) {
    const now = new Date();
    const res = await this.prisma.socialStoryUserLike.upsert({
      create: { storyId, userId: operatorId },
      update: { deletedDate: null, createdDate: now },
      where: { storyId_userId: { storyId, userId: operatorId } },
    });
    const story = await this.prisma.socialStory.findFirst({
      where: { id: storyId },
    });
    this.eventEmitter.emit(
      SOCIAL_LIKED,
      new SocialLikedPayload(operatorId, story.userId, now, storyId)
    );
    return res;
  }

  async unlikeStory(storyId: string, operatorId: string) {
    const now = new Date();
    const res = await this.prisma.socialStoryUserLike.delete({
      where: { storyId_userId: { storyId, userId: operatorId } },
    });
    const story = await this.prisma.socialStory.findFirst({
      where: { id: storyId },
    });
    this.eventEmitter.emit(
      SOCIAL_UNLIKED,
      new SocialLikedPayload(operatorId, story.userId, now, storyId)
    );
    return res;
  }

  async getStories(operatorId: string) {
    const stories = await this.prisma.socialStory.findMany({
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            profile: {
              include: {
                avatar: {
                  select: {
                    src: true,
                    alt: true,
                  },
                },
              },
            },
          },
        },
        mediaAsset: {
          select: { src: true, alt: true },
        },
        comments: {
          select: {
            author: {
              select: {
                firstName: true,
                lastName: true,
                profile: {
                  select: {
                    avatar: {
                      select: {
                        src: true,
                        alt: true,
                      },
                    },
                  },
                },
              },
            },
            body: true,
          },
        },
        socialStoryUserLike: {
          select: { createdDate: true },
          where: { deletedDate: { equals: null }, userId: operatorId },
        },
      },
      orderBy: { createdDate: 'desc' },
    });
    return stories.map((i) => ({
      ...i,
      likedByYou: i.socialStoryUserLike.length > 0,
    }));
  }

  async getActivities(lastReadAt: number | null, limit: number) {
    const results = await this.prisma.socialActivity.findMany({
      include: {
        operator: { select: { username: true } },
        targetUser: { select: { username: true } },
        story: {
          select: {
            content: true,
            mediaAsset: { select: { src: true, alt: true } },
          },
        },
      },
      orderBy: { id: 'desc' },
      where: lastReadAt === null ? {} : { id: { lt: lastReadAt } },
      take: limit,
    });
    if (results.length > 0) {
      return {
        results,
        stopAt: results[results.length - 1].id,
        hasNext: results.length === limit,
      };
    } else {
      return { results, hasNext: false };
    }
  }
}
