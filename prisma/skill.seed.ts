import { PrismaClient } from '@prisma/client';
import { SKILLS } from './seed-data/skill.data';

export class SkillSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    for (const skill of SKILLS) {
      await this.prisma.skillsEntity.upsert({
        create: skill,
        update: {},
        where: { name: skill.name },
      });
    }
  }
}
