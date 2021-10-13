import { PrismaClient } from '@prisma/client';
import { SOCIAL_MEDIAS } from '../seed-data/social-media.data';
import { Seeder } from './seeder';

export class SocialMediaSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.socialMediaEntity.createMany({
      data: SOCIAL_MEDIAS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.socialMediaEntity.deleteMany();
  }
}
