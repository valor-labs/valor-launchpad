import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from '@valor-launchpad/auth-api';
import { SocketConnService } from './socket-conn.service';

@WebSocketGateway({
  cors: { origin: process.env.HOST },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger(NotificationGateway.name);

  constructor(
    private authService: AuthService,
    private socketConnService: SocketConnService
  ) {}

  afterInit() {
    this.logger.log('Init notification socket server');
  }

  handleDisconnect(client: Socket) {
    // todo: find some way to put userId in client
    const user = this.authService.jwtService.decode(
      client.handshake.headers.authorization
    ) as { id: string };
    this.socketConnService.delete(user.id, client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const user = this.authService.jwtService.decode(
      client.handshake.headers.authorization
    ) as { id: string };
    this.socketConnService.add(user.id, client);
  }
}
