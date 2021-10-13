import { PrismaClient } from '@prisma/client';
import { LANGUAGES } from '../seed-data/language.data';
import { Seeder } from './seeder';

export class LanguageSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.language.createMany({
      data: LANGUAGES,
    });
  }

  async delete() {
    return this.prisma.language.deleteMany();
  }
}
