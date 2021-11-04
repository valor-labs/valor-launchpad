import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from '@valor-launchpad/prisma';
import { SocketGatewayModule } from '@valor-launchpad/socket-gateway';

@Module({
  imports: [PrismaModule, SocketGatewayModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationApiModule {}
