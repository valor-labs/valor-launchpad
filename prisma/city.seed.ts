import { PrismaClient } from '@prisma/client';
import { CITIES } from './seed-data/city.data';

export class CitySeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    const one = await this.prisma.city.findFirst();
    if (!one) {
      await this.prisma.city.createMany({ data: CITIES });
    }
  }
}
