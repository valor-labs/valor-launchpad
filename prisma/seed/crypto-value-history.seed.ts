import { PrismaClient, Prisma } from '@prisma/client';
import { valueHistoryData } from '../seed-data/crypto-value-history.data';
import { Seeder } from './seeder';


export class CryptoValueHistorySeed implements Seeder {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    return await this.insertData();
  }

  async delete(): Promise<unknown> {
    return await this.clearTable();
  }

  async clearTable() {
    await this.prisma.cryptoValueHistory.deleteMany();
  }

  private async insertData() {
    await this.prisma.cryptoValueHistory.createMany({
      data: valueHistoryData.map((item) => {
        const { date, value } = item;
        const [open, high, low, close] = value;

        return {
          date,
          open,
          high,
          low,
          close
        }
      })
    })
  }
}
