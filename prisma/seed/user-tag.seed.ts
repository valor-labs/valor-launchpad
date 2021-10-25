import { PrismaClient, Prisma } from '@prisma/client';
import { tags } from '../seed-data/tags.data';
import { Seeder } from './seeder';
import { USERS } from '../seed-data/users';

export class UserTagSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return this.prisma.userTagsEntity.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return this.prisma.userTagsEntity.deleteMany();
  }

  private generate() {
    const result: Prisma.UserTagsEntityCreateManyInput[] = [];
    for (const user of USERS) {
      for (const tag of tags) {
        result.push({ user_id: user.id, tag_id: tag.id });
      }
    }
    return result;
  }
}
