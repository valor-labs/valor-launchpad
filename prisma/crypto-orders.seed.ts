import { PrismaClient, Prisma } from '@prisma/client';
import { sellOrdersData, buyOrdersData } from './seed-data/crypto-orders.data';

enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export class CryptoOrdersSeed {
  constructor(private prisma: PrismaClient) {
  }

  async seed() {
    await this.clearTable();
    await this.insertData();
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