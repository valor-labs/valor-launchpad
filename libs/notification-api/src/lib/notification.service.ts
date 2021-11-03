import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocketConnService } from '@valor-launchpad/socket-gateway';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private socketConnService: SocketConnService
  ) {}

  async getNotifications(userId: string) {
    return await this.prisma.notification.findMany({
      where: { deletedDate: null, userId, read: false },
      orderBy: { createdDate: 'desc' },
    });
  }

  markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId },
      data: {
        read: true,
        readDate: new Date(),
      },
    });
  }

  async createCommentNotification(projectId: string, actingUser) {
    const project = await this.prisma.projectsEntity.findFirst({
      include: {
        summary: { select: { reporter: { select: { id: true } } } },
        assignee: { select: { userId: true } },
      },
      where: { id: projectId },
    });
    const userIds = Array.from(
      new Set([
        project.summary.reporter.id,
        ...project.assignee.map((i) => i.userId),
      ])
    );
    for (const userId of userIds) {
      const notification = await this.prisma.notification.create({
        data: {
          userId,
          type: 'COMMENT',
          read: false,
          readDate: null,
          extras: { project, actingUser } as unknown as Prisma.JsonObject,
        },
      });
      this.notify(userId, notification);
    }
  }

  async createReplyNotification(commentDto, actingUser) {
    const comment = await this.prisma.commentEntity.findFirst({
      where: { id: commentDto.commentId },
    });
    const notification = await this.prisma.notification.create({
      data: {
        userId: comment.author_id,
        type: 'REPLY_COMMENT',
        read: false,
        readDate: null,
        extras: { comment, actingUser } as unknown as Prisma.JsonObject,
      },
    });
    this.notify(comment.author_id, notification);
  }

  async createLikeCommentNotification(commentId: string, actingUser) {
    const comment = await this.prisma.commentEntity.findFirst({
      where: { id: commentId },
    });
    const notification = await this.prisma.notification.create({
      data: {
        userId: comment.author_id,
        type: 'LIKE_COMMENT',
        read: false,
        extras: { comment, actingUser } as unknown as Prisma.JsonObject,
      },
    });
    this.notify(comment.author_id, notification);
  }

  private notify(userId: string, notification: NotificationVo) {
    this.socketConnService.notifyByUserId(
      userId,
      'newNotification',
      notification
    );
  }
}
