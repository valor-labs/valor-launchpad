import { PrismaClient } from '@prisma/client';
import { STORIES } from './seed-data/story.data';

export class StorySeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    for (const story of STORIES) {
      await this.prisma.socialStory.upsert({
        create: story,
        update: {content: story.content},
        where: { id: story.id }
      })
    }
  }
}
