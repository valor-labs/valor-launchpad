import { PrismaClient, Prisma } from '@prisma/client';
import { valueHistoryData } from './seed-data/crypto-value-history.data';


export class CryptoValueHistorySeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    await this.clearTable();
    await this.insertData();
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