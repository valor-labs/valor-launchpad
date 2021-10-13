import { PrismaClient } from '@prisma/client';
import { STORIES } from '../seed-data/story.data';
import { Seeder } from './seeder';

export class StorySeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.socialStory.createMany({
      data: STORIES,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.socialStory.deleteMany();
  }
}
