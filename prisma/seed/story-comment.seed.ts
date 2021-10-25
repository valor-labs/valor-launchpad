import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { STORY_COMMENTS } from '../seed-data/story.data';

export class StoryCommentSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.commentEntity.createMany({
      data: STORY_COMMENTS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.commentEntity.deleteMany({
      where: { storyId: { not: null } },
    });
  }
}
