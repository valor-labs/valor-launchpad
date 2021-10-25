import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { EMPLOYER_PROFILES } from '../seed-data/profile-employer.data';

export class ProfileEmployerSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.profileEmployerEntity.createMany({
      data: EMPLOYER_PROFILES,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.profileEmployerEntity.deleteMany();
  }
}
