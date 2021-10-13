import { PrismaClient } from '@prisma/client';
import { SKILLS } from '../seed-data/skill.data';
import { Seeder } from './seeder';

export class SkillSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return this.prisma.skillsEntity.createMany({
      data: SKILLS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.skillsEntity.deleteMany();
  }
}
