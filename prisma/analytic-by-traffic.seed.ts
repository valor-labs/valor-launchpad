import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from './utils';
import { datatype } from 'faker';

export class AnalyticByTrafficSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticByTraffic.deleteMany();
    await this.prisma.analyticByTraffic.createMany({
      data: this.generate(),
    });
  }

  private generate() {
    const data: Prisma.AnalyticByTrafficCreateManyInput[] = [];
    const sources = [
      'Google',
      'Direct',
      'Facebook',
      'GitHub',
      'DuckDuckGo',
      'Pinterest',
      'Bing',
      'Twitter',
    ];

    for (const source of sources) {
      everydayOfYear().forEach((date) => {
        data.push({
          date,
          source,
          userCount: datatype.number(100),
          sessionCount: datatype.number(200),
          bounceRate: datatype.float({ min: 0, max: 0.7, precision: 0.01 }),
          sessionDuration: datatype.number({ min: 20, max: 3600 }),
        });
      });
    }
    return data;
  }
}
