import { PrismaClient } from '@prisma/client';
import { LANGUAGES } from './seed-data/language.data';

export class LanguageSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.language.createMany({
      data: LANGUAGES,
      skipDuplicates: true,
    });
  }
}
