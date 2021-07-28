import {PrismaClient} from '@prisma/client';
import * as Faker from 'faker';

export class MediaSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createMedia(type: 'project' | 'company' | 'user', id: string) {
    if (type === 'project') {
      return await this.prisma.mediaAsset.create({
        data: {
          type: 'image/png',
          src: Faker.image.imageUrl(),
          alt: Faker.lorem.word(3),
          project_id: id
        }
      })
    }
  }
}
