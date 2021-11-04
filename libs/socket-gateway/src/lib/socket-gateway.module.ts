import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketConnService } from './socket-conn.service';
import { AuthApiModule } from '@valor-launchpad/auth-api';

@Module({
  imports: [AuthApiModule],
  controllers: [],
  providers: [SocketGateway, SocketConnService],
  exports: [SocketConnService],
})
export class SocketGatewayModule {}
