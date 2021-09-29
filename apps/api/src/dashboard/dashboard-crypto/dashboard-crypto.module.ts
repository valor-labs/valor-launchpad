import { Module } from '@nestjs/common';
import { DashboardCryptoController } from './dashboard-crypto.controller';
import { DashboardCryptoService } from './dashboard-crypto.service';
import { PrismaService } from '@valor-launchpad/prisma';


@Module({
  controllers: [DashboardCryptoController],
  providers: [PrismaService, DashboardCryptoService]
})
export class DashboardCryptoModule {}
