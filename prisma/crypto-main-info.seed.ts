import { PrismaClient, Prisma } from '@prisma/client';
import { cryptoMainInfoData } from './seed-data/crypto-main-info.data';


export class CryptoMainInfoSeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    await this.clearTable();
    await this.insertData();
  }

  async clearTable() {
    await this.prisma.cryptoMainInfo.deleteMany();
  }

  private async insertData() {
    await this.prisma.cryptoMainInfo.createMany({
      data: cryptoMainInfoData
    }
    );
  }
}