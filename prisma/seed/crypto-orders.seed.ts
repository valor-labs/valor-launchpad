import { PrismaClient, Prisma } from '@prisma/client';
import { sellOrdersData, buyOrdersData } from '../seed-data/crypto-orders.data';
import { Seeder } from './seeder';

enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export class CryptoOrdersSeed implements Seeder {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    return await this.insertData();
  }

  async delete(): Promise<unknown> {
    return await this.clearTable();
  }

  async clearTable() {
    await this.prisma.cryptoOrders.deleteMany();
  }

  private async insertData() {
    await this.prisma.cryptoOrders.createMany({
      data: [
        ...this.addTypeFiled(OrderType.SELL, sellOrdersData),
        ...this.addTypeFiled(OrderType.BUY, buyOrdersData)]
    }
    );
  }

  private addTypeFiled(orderTpye: OrderType, data: any[]) {
    return data.map((item) => {
      const { price, eth, btc, sum } = item;

      return {
        type: orderTpye,
        price: parseFloat(price),
        eth: parseFloat(eth),
        btc: parseFloat(btc),
        sum: parseFloat(sum)
      }
    })
  }
}
