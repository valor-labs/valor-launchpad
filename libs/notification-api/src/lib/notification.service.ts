import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocketConnService } from '@valor-launchpad/socket-gateway';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { Prisma } from '@prisma/client';
import { QueryNotificationListDto } from './dto/query-notification-list.dto';
import { MarkAsReadDto } from './dto/mark-as-read.dto';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private socketConnService: SocketConnService
  ) {}

  async getNotifications(query: QueryNotificationListDto, userId: string) {
    const take = query.pageSize ?? 10;
    const pageIndex = query.pageIndex ?? 1;
    const skip = (pageIndex - 1) * take;

    const where: Prisma.NotificationWhereInput = { deletedDate: null, userId };
    if (Reflect.has(query, 'read')) {
      where.read = query.read;
    }
    // todo: type filter

    const data = await this.prisma.notification.findMany({
      where,
      orderBy: { createdDate: 'desc' },
      take,
      skip,
    });
    const total = await this.prisma.notification.count({ where });
    return { data, page: { total, pageIndex, pageSize: take } };
  }

  markAllAsRead(markAsReadDto: MarkAsReadDto, actingUserId: string) {
    const where: Prisma.NotificationWhereInput = {
      userId: actingUserId,
    };
    if (markAsReadDto.notificationIds?.length) {
      where.id = { in: markAsReadDto.notificationIds };
    }
    return this.prisma.notification.updateMany({
      where,
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

  async createReplyNotification(projectId: string, commentDto, actingUser) {
    const comment = await this.prisma.commentEntity.findFirst({
      where: { id: commentDto.commentId },
    });
    const project = await this.prisma.projectsEntity.findFirst({
      where: { id: projectId },
    });
    const notification = await this.prisma.notification.create({
      data: {
        userId: comment.author_id,
        type: 'REPLY_COMMENT',
        read: false,
        readDate: null,
        extras: {
          comment,
          actingUser,
          project,
        } as unknown as Prisma.JsonObject,
      },
    });
    this.notify(comment.author_id, notification);
  }

  async createLikeCommentNotification(commentId: string, actingUser) {
    const comment = await this.prisma.commentEntity.findFirst({
      where: { id: commentId },
    });
    const project = await this.prisma.projectsEntity.findFirst({
      where: { id: comment.project_id },
    });
    const notification = await this.prisma.notification.create({
      data: {
        userId: comment.author_id,
        type: 'LIKE_COMMENT',
        read: false,
        extras: {
          comment,
          actingUser,
          project,
        } as unknown as Prisma.JsonObject,
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
