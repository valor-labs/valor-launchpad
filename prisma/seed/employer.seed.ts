import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { EMPLOYERS } from '../seed-data/employer.data';

export class EmployerSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.employerEntity.createMany({
      data: EMPLOYERS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.employerEntity.deleteMany();
  }
}
