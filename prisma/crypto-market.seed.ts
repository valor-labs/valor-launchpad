import { PrismaClient, Prisma } from '@prisma/client';
import { marketData } from './seed-data/crypto-market.data';

export class CryptoMarketSeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    await this.clearTable();
    await this.insertData();
  }

  async clearTable() {
    await this.prisma.cryptoMarkets.deleteMany();
  }

  private async insertData() {
    await this.prisma.cryptoMarkets.createMany({
      data: marketData.map((item) => {
        const { price, volume, ...other } = item;

        return {
          ...other,
          price: parseFloat(price),
          volume: parseFloat(volume)
        }
      })
    });
  }
}