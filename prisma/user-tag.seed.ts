import { PrismaClient } from '@prisma/client';
import { tags } from './seed-data/tags.data';

interface UserTagsSeedEntity {
  user_id: string;
  tag_id: string;
}

export class UserTagSeed {
  constructor(private prisma: PrismaClient) { }

  async seed() {
    for (const item of await this.buildUserTags()) {
      await this.seedOne(item);
    }
  }

  private async seedOne(userTag: UserTagsSeedEntity) {
    return this.prisma.userTagsEntity.upsert({
      create: userTag,
      update: {},
      where: {user_id_tag_id: userTag},
    })
  }

  private async buildUserTags() {
    const users = await this.prisma.userEntity.findMany({select: {id: true}});
    const result: UserTagsSeedEntity[] = [];
    for (const user of users) {
      for (const tag of tags) {
        result.push({ user_id: user.id, tag_id: tag.id })
      }
    }
    return result;
  }
}
