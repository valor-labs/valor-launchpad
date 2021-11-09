import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from '@valor-launchpad/auth-api';
import { SocketConnService } from './socket-conn.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: process.env.HOST },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  private logger = new Logger(SocketGateway.name);
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
    this.server.emit('userDisconnected', user.id);
  }

  handleConnection(client: Socket) {
    const user = this.authService.jwtService.decode(
      client.handshake.headers.authorization
    ) as { id: string };
    this.socketConnService.add(user.id, client);
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('userConnected', user.id);
  }
}