import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from './utils';
import { datatype } from 'faker';

export class AnalyticByCitySeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.analyticByCity.deleteMany();
    await this.prisma.analyticByCity.createMany({
      data: await this.generate(),
    });
  }

  private async generate() {
    const cities = await this.prisma.city.findMany();
    const data: Prisma.AnalyticByCityCreateManyInput[] = [];
    for (const { id } of cities) {
      everydayOfYear().forEach((date) => {
        data.push({
          date,
          cityId: id,
          value: datatype.number(20),
        });
      });
    }
    return data;
  }
}
