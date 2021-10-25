import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { SOCIAL_ACTIVITIES } from '../seed-data/social-activity.data';

export class ActivitySeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.socialActivity.createMany({
      data: SOCIAL_ACTIVITIES,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.socialActivity.deleteMany();
  }
}
