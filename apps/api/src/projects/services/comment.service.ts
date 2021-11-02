import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { CreateProjectCommentDto } from '../dto/create-project-comment.dto';
import { InvalidDeleteException } from '../exceptions/invalid-delete';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(private prisma: PrismaService) {}

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

  // todo: notify relevant user
  createComment(
    projectId: string,
    commentDto: CreateProjectCommentDto,
    actingUser
  ) {
    return this.prisma.commentEntity.create({
      data: {
        author_id: actingUser.id,
        body: commentDto.body,
        project_id: projectId,
        parentId: commentDto.commentId,
      },
    });
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

  // todo: notify relevant user
  likeComment(commentId: string, actingUser) {
    const now = new Date();
    return this.prisma.commentUserLike.upsert({
      where: { commentId_userId: { commentId, userId: actingUser.id } },
      create: { commentId, userId: actingUser.id, createdDate: now },
      update: { deletedDate: null },
    });
  }

  // todo: notify relevant user
  unlikeComment(commentId: string, actingUser) {
    return this.prisma.commentUserLike.delete({
      where: { commentId_userId: { userId: actingUser.id, commentId } },
    });
  }
}
