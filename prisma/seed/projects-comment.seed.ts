import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { PROJECT_COMMENTS } from '../seed-data/project-comment.data';

export class ProjectsCommentSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return this.prisma.commentEntity.createMany({ data: PROJECT_COMMENTS });
  }

  async delete(): Promise<unknown> {
    const parentComments = await this.prisma.commentEntity.findMany({
      where: { project_id: { not: null } },
    });
    const parentCommentIds = parentComments.map((i) => i.id);
    await this.prisma.commentEntity.deleteMany({
      where: {
        OR: [
          { project_id: { not: null } },
          { parentId: { in: parentCommentIds } },
        ],
      },
    });
    return;
  }
}
