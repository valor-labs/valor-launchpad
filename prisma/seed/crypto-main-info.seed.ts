import { PrismaClient } from '@prisma/client';
import { cryptoMainInfoData } from '../seed-data/crypto-main-info.data';
import { Seeder } from './seeder';

export class CryptoMainInfoSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.cryptoMainInfo.createMany({
      data: cryptoMainInfoData,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.cryptoMainInfo.deleteMany();
  }
}
