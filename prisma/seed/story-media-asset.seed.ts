import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { STORIES, STORY_MEDIA_ASSETS } from '../seed-data/story.data';

export class StoryMediaAssetSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.mediaAsset.createMany({
      data: STORY_MEDIA_ASSETS,
    })
  }

  async delete(): Promise<unknown> {
    return await this.prisma.mediaAsset.deleteMany({
      where: { story_id: { in: STORIES.map((s) => s.id) } },
    });
  }
}
