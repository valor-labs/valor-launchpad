import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  SOCIAL_FOLLOWED,
  SOCIAL_LIKED,
  SOCIAL_UNFOLLOWED,
  SOCIAL_FOLLOWED_PAYLOAD,
  SOCIAL_UNLIKED,
  SocialLikedPayload,
} from './social-events.constant';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class SocialActivityService {
  constructor(private prismaService: PrismaService) {}

  private readonly logger = new Logger(SocialActivityService.name);

  @OnEvent(SOCIAL_FOLLOWED, { async: true })
  async onFollowedSomeone({
    userId,
    operatorId,
    actionAt,
  }: SOCIAL_FOLLOWED_PAYLOAD) {
    try {
      await this.followOrUnfollow(userId, operatorId, actionAt, 'FOLLOWED');
      this.logger.log(`Log ${SOCIAL_FOLLOWED} activity succeeded.`);
    } catch (e) {
      this.logger.warn(`Log ${SOCIAL_FOLLOWED} activity failed.`);
    }
  }

  @OnEvent(SOCIAL_UNFOLLOWED, { async: true })
  async onUnfollowedSomeone({
    userId,
    operatorId,
    actionAt,
  }: SOCIAL_FOLLOWED_PAYLOAD) {
    try {
      await this.followOrUnfollow(userId, operatorId, actionAt, 'UNFOLLOWED');
      this.logger.log(`Log ${SOCIAL_UNFOLLOWED} activity succeeded.`);
    } catch (e) {
      this.logger.warn(`Log ${SOCIAL_UNFOLLOWED} activity failed.`);
    }
  }

  @OnEvent(SOCIAL_LIKED, { async: true })
  async onLikedSomeoneStory(payload: SocialLikedPayload) {
    const { operatorId, targetUserId, actionAt, storyId } = payload;
    try {
      await this.likeOrUnlikeStory(
        targetUserId,
        operatorId,
        storyId,
        actionAt,
        'LIKED_STORY'
      );
      this.logger.log(`Log ${SOCIAL_LIKED} activity succeeded.`);
    } catch (e) {
      this.logger.warn(`Log ${SOCIAL_LIKED} activity failed.`);
    }
  }

  @OnEvent(SOCIAL_UNLIKED, { async: true })
  async onUnlikedSomeoneStory(payload: SocialLikedPayload) {
    const { operatorId, targetUserId, actionAt, storyId } = payload;
    try {
      await this.likeOrUnlikeStory(
        targetUserId,
        operatorId,
        storyId,
        actionAt,
        'UNLIKED_STORY'
      );
      this.logger.log(`Log ${SOCIAL_UNLIKED} activity succeeded.`);
    } catch (e) {
      this.logger.warn(`Log ${SOCIAL_UNLIKED} activity failed.`);
    }
  }

  private async followOrUnfollow(
    userId,
    operatorId,
    actionAt,
    action: 'FOLLOWED' | 'UNFOLLOWED'
  ) {
    const { targetUser, operateUser } = await this.fetchUsers(
      userId,
      operatorId
    );
    await this.prismaService.socialActivity.create({
      data: {
        operatorId: operateUser.id,
        operatorFullName: `${operateUser.firstName} ${operateUser.lastName}`,
        operatorAvatarSrc: operateUser.avatar.src,
        action,
        targetUserId: targetUser.id,
        targetUserFullName: `${targetUser.firstName} ${targetUser.lastName}`,
        targetUserAvatarSrc: targetUser.avatar.src,
        createdDate: actionAt,
      },
    });
  }

  private async likeOrUnlikeStory(
    targetUserId: string,
    operatorId: string,
    storyId: string,
    actionAt: Date,
    action: 'LIKED_STORY' | 'UNLIKED_STORY'
  ) {
    const { targetUser, operateUser } = await this.fetchUsers(
      targetUserId,
      operatorId
    );
    await this.prismaService.socialActivity.create({
      data: {
        operatorId: operateUser.id,
        operatorFullName: `${operateUser.firstName} ${operateUser.lastName}`,
        operatorAvatarSrc: operateUser.avatar.src,
        action,
        targetUserId: targetUser.id,
        targetUserFullName: `${targetUser.firstName} ${targetUser.lastName}`,
        targetUserAvatarSrc: targetUser.avatar.src,
        createdDate: actionAt,
        storyId,
      },
    });
  }

  private async fetchUsers(targetUserId: string, operatorId: string) {
    const users = await this.prismaService.userEntity.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: { select: { src: true } },
      },
      where: { id: { in: [targetUserId, operatorId] } },
      take: 2,
    });
    const targetUser = users.find((i) => i.id === targetUserId);
    const operateUser = users.find((i) => i.id === operatorId);
    return { targetUser, operateUser };
  }
}
