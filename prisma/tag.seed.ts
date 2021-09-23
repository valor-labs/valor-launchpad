import { PrismaClient } from '@prisma/client';
import { TagsCreateEntity } from '../libs/common-api/src';
import { tags } from './seed-data/tags.data';

export class TagSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createAllTags() {
    for (const tag of tags) {
      await this.createTag(tag);
    }
  }

  private async createTag(tag: TagsCreateEntity) {
    return this.prisma.tagsEntity.upsert({
      create: tag,
      update: { name: tag.name },
      where: { id: tag.id }
    });
  }
}
