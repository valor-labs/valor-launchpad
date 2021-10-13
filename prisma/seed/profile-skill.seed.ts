import { PrismaClient, Prisma } from '@prisma/client';
import { Seeder } from './seeder';
import { PROFILES } from '../seed-data/profile.data';
import { SKILLS } from '../seed-data/skill.data';

export class ProfileSkillSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.profileSkillsEntity.createMany({
      data: this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.profileSkillsEntity.deleteMany();
  }

  private generate() {
    const data: Prisma.ProfileSkillsEntityCreateManyInput[] = [];
    for (const profile of PROFILES) {
      for (const skill of SKILLS) {
        data.push({
          skillsId: skill.id,
          profileId: profile.id,
        });
      }
    }
    return data;
  }
}
