import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SocketGatewayModule } from '@valor-launchpad/socket-gateway';
import { PrismaModule } from '@valor-launchpad/prisma';
import { ChatController } from './chat.controller';
import { ChatUnreadService } from './chat-unread.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [SocketGatewayModule, PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, ChatUnreadService, ChatGateway],
  exports: [],
})
export class ChatApiModule {}
