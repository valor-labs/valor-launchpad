import { PrismaClient, Prisma } from '@prisma/client';
import { Seeder } from './seeder';
import { PROFILES } from '../seed-data/profile.data';
import { SOCIAL_MEDIAS } from '../seed-data/social-media.data';

export class ProfileSocialMediaSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return this.prisma.socialMediaMatchingEntity.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.socialMediaMatchingEntity.deleteMany({
      where: { profileId: { in: PROFILES.map((i) => i.id) } },
    });
  }

  private generate() {
    const data: Prisma.SocialMediaMatchingEntityCreateManyInput[] = [];
    for (const profile of PROFILES) {
      for (const media of SOCIAL_MEDIAS) {
        data.push({
          profileId: profile.id,
          socialMediaId: media.id,
          socialMediaUrl: media.baseUrl,
        });
      }
    }
    return data;
  }
}
