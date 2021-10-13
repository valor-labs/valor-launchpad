import { PrismaClient, Prisma } from '@prisma/client';
import { everydayOfYear } from '../utils';
import { datatype } from 'faker';
import { Seeder } from './seeder';

export class AnalyticByCitySeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.analyticByCity.createMany({
      data: await this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.analyticByCity.deleteMany();
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
