import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@valor-launchpad/prisma';
import { CreateProjectCommentDto } from '../dto/create-project-comment.dto';
import { InvalidDeleteException } from '../exceptions/invalid-delete';
import { SocketConnService } from '@valor-launchpad/notification-api';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    private prisma: PrismaService,
    private socketConnService: SocketConnService
  ) {}

  async getComments(projectId: string, actingUser) {
    const comments = await this.prisma.commentEntity.findMany({
      where: { project_id: projectId, parentId: null, deletedDate: null },
      include: {
        author: {
          include: {
            profile: { include: { avatar: true } },
          },
        },
        children: {
          include: {
            author: {
              include: {
                profile: { include: { avatar: true } },
              },
            },
          },
          where: { deletedDate: null },
          orderBy: { createdDate: 'asc' },
        },
        userLike: {
          where: { deletedDate: null, userId: actingUser.id },
        },
      },
      orderBy: { createdDate: 'asc' },
    });
    return comments.map((comment) => ({
      ...comment,
      deletable: comment.author_id === actingUser.id,
      children: comment.children.map((childComment) => ({
        ...childComment,
        deletable: childComment.author_id === actingUser.id,
      })),
      liked: comment.userLike.length > 0,
    }));
  }

  async createComment(
    projectId: string,
    commentDto: CreateProjectCommentDto,
    actingUser
  ) {
    const comment = await this.prisma.commentEntity.create({
      data: {
        author_id: actingUser.id,
        body: commentDto.body,
        project_id: projectId,
        parentId: commentDto.commentId,
      },
    });

    if (commentDto.commentId) {
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
      this.socketConnService.notifyUser(comment.author_id, notification);
    } else {
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
        this.socketConnService.notifyUser(userId, notification);
      }
    }

    return comment;
  }

  async deleteComment(commentId: string, actingUser) {
    // check if this comment is created by acting user
    const comment = await this.prisma.commentEntity.findFirst({
      where: { id: commentId },
    });
    if (comment.author_id === actingUser.id) {
      return this.prisma.$transaction([
        this.prisma.commentEntity.deleteMany({
          where: { parentId: commentId },
        }),
        this.prisma.commentEntity.delete({ where: { id: commentId } }),
      ]);
    } else {
      this.logger.error(
        `${actingUser.username} is trying to delete a comment created by uid: ${comment.author_id}`
      );
      throw new InvalidDeleteException();
    }
  }

  async likeComment(commentId: string, actingUser) {
    const now = new Date();
    const commentUserLike = await this.prisma.commentUserLike.upsert({
      where: { commentId_userId: { commentId, userId: actingUser.id } },
      create: { commentId, userId: actingUser.id, createdDate: now },
      update: { deletedDate: null },
    });
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
    this.socketConnService.notifyUser(comment.author_id, notification);
    return commentUserLike;
  }

  // todo: notify relevant user
  unlikeComment(commentId: string, actingUser) {
    return this.prisma.commentUserLike.delete({
      where: { commentId_userId: { userId: actingUser.id, commentId } },
    });
  }
}
