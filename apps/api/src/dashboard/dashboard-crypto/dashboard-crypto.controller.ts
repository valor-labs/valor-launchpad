import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { DashboardCryptoService } from './dashboard-crypto.service';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class DashboardCryptoController {
  constructor(private dashboardCryptoService: DashboardCryptoService) {}

  @Get('crypto-main-info')
  getCryptoMainInfo() {
    return this.dashboardCryptoService.getCryptoMainInfo();
  }

  @Get('crypto-markets')
  getCryptoMarkets() {
    return this.dashboardCryptoService.getCryptoMarkets();
  }

  @Get('crypto-orders')
  getCryptoOrders() {
    return this.dashboardCryptoService.getCryptoOrders();
  }

  @Get('crypto-k-lines')
  getCryptoKLines() {
    return this.dashboardCryptoService.getCryptoKLines();
  }
}
