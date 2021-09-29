import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { CryptoMainInfoDto, CryptoMarketDto, CryptoOrderDto, CryptoKLineDto } from './dashboard-crypto.dto';

@Injectable()
export class DashboardCryptoService {
  constructor(
    private prisma: PrismaService
  ) { }

  async getCryptoMainInfo(): Promise<CryptoMainInfoDto[]> {
    const res = await this.prisma.cryptoMainInfo.findMany({
      take: 100
    })

    return res.map((item => {
      const { price, priceByUS, volume, change, ...other } = item;

      return {
        ...other,
        price: price.toString(),
        priceByUS: priceByUS.toNumber(),
        volume: volume.toNumber(),
        change: change.toNumber()
      }
    }))
  }

  async getCryptoMarkets(): Promise<CryptoMarketDto[]> {
    const res = await this.prisma.cryptoMarkets.findMany({
      take: 100
    })

    return res.map((item) => {
      const { price, volume, change, ...other } = item;

      return {
        ...other,
        price: price.toFixed(8),
        volume: `${Math.round(volume.toNumber() * 1000) / 1000}`,
        change: change.toNumber()
      }
    });
  }

  async getCryptoOrders(): Promise<CryptoOrderDto[]> {
    const res = await this.prisma.cryptoOrders.findMany({
      take: 100
    })

    return res.map((item) => {
      const { price, eth, btc, sum, ...other } = item;

      return {
        ...other,
        price: price.toString(),
        eth: eth.toFixed(8),
        btc: btc.toFixed(8),
        sum: sum.toString()
      }
    });
  }

  async getCryptoKLines(): Promise<CryptoKLineDto[]> {
    const res = await this.prisma.cryptoValueHistory.findMany({
      take: 100
    })

    return res.map((item) => {
      const { open, high, close, low, ...other } = item;

      return {
        ...other,
        open: open.toNumber(),
        high: high.toNumber(),
        close: close.toNumber(),
        low: low.toNumber()
      }
    });
  }
}
