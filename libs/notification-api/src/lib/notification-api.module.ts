import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { AuthApiModule } from '@valor-launchpad/auth-api';
import { PrismaModule } from '@valor-launchpad/prisma';
import { SocketConnService } from './socket-conn.service';

@Module({
  imports: [AuthApiModule, PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, SocketConnService],
  exports: [NotificationService, SocketConnService],
})
export class NotificationApiModule {}
