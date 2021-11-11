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
    const userId = client.data.user.id;
    this.socketConnService.delete(userId, client);
    this.logger.log(`Client disconnected: ${client.id}`);
    // check if all connection has been closed, as user may open several browser tabs
    const stillHasConnection = this.socketConnService.isConnected(userId);
    if (!stillHasConnection) {
      this.server.emit('userDisconnected', userId);
    }
  }

  handleConnection(client: Socket) {
    const user = this.authService.jwtService.decode(
      client.handshake.headers.authorization
    ) as { id: string };
    client.data.user = user;
    this.socketConnService.add(user.id, client);
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('userConnected', user.id);
  }
}
