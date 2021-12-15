import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { DashboardCryptoService } from './dashboard-crypto.service';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class DashboardCryptoController {
  constructor(private dashboardCryptoService: DashboardCryptoService) {}

  @Get('crypto-main-info')
  async getCryptoMainInfo() {
    try {
      const mainInfo = await this.dashboardCryptoService.getCryptoMainInfo();

      return new ResponseSuccess('Load Main Info Success', mainInfo);
    } catch (err) {
      return new ResponseError('Load Main Info Failed', err);
    }
  }

  @Get('crypto-markets')
  async getCryptoMarkets() {
    try {
      const markets = await this.dashboardCryptoService.getCryptoMarkets();

      return new ResponseSuccess('Load Markets Success', markets);
    } catch (err) {
      return new ResponseError('Load Markets Failed', err);
    }
  }

  @Get('crypto-orders')
  async getCryptoOrders() {
    try {
      const orders = await this.dashboardCryptoService.getCryptoOrders();

      return new ResponseSuccess('Load Orders Success', orders);
    } catch (err) {
      return new ResponseError('Load Markets Failed', err);
    }
  }

  @Get('crypto-k-lines')
  async getCryptoKLines() {
    try {
      const klines = await this.dashboardCryptoService.getCryptoKLines();
      return new ResponseSuccess('Load KLines Success', klines);
    } catch (err) {
      return new ResponseError('Load KLines Failed', err);
    }
  }
}
