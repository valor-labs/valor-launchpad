import { PrismaClient } from '@prisma/client';
import { marketData } from '../seed-data/crypto-market.data';
import { Seeder } from './seeder';

export class CryptoMarketSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.insertData();
  }

  async delete(): Promise<unknown> {
    return await this.clearTable();
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
          volume: parseFloat(volume),
        };
      }),
    });
  }
}
