import { PrismaClient } from '@prisma/client';
import { CITIES } from '../seed-data/city.data';
import { Seeder } from './seeder';

export class CitySeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.city.createMany({ data: CITIES });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.city.deleteMany();
  }
}
