import { PrismaClient } from '@prisma/client';
import { SOCIAL_MEDIAS } from './seed-data/social-media.data';

export class SocialMediaSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    for (const socialMedia of SOCIAL_MEDIAS) {
      await this.prisma.socialMediaEntity.upsert({
        where: { id: socialMedia.id },
        create: socialMedia,
        update: {},
      });
    }
  }
}
