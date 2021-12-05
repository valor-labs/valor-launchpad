import { PrismaClient } from '@prisma/client';
import { tags } from '../seed-data/tags.data';
import { Seeder } from './seeder';

export class TagSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.tagsEntity.createMany({
      data: tags,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.tagsEntity.deleteMany();
  }
}
