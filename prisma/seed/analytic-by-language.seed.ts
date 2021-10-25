import { PrismaClient, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { datatype } from 'faker';
import { Seeder } from './seeder';

export class AnalyticByLanguageSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticByLanguage.createMany({
      data: await this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticByLanguage.deleteMany();
  }

  async generate(): Promise<Prisma.AnalyticByLanguageCreateManyInput[]> {
    const thisYear = new Date().getFullYear();
    const languages = await this.prisma.language.findMany();
    const data: Prisma.AnalyticByLanguageCreateManyInput[] = [];
    for (const item of languages) {
      new Array(365).fill(null).forEach((_, index) => {
        data.push({
          date: dayjs(`${thisYear}-01-01`, { utc: true })
            .add(index, 'd')
            .toDate(),
          languageId: item.id,
          value: datatype.number({ min: 10, max: 80 }),
        });
      });
    }
    return data;
  }
}
