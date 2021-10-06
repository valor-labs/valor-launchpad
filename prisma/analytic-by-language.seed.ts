import { PrismaClient, Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import { datatype } from 'faker';

export class AnalyticByLanguageSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticByLanguage.deleteMany();
    await this.prisma.analyticByLanguage.createMany({
      data: await this.generate(),
    });
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
