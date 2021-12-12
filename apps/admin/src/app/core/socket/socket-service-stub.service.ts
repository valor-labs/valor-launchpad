import { ISocketService } from './socket-service.interface';
import { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

export class SocketServiceStubService implements ISocketService {
  socket: Socket;
  connect() {
    // pass
  }
  disconnect() {
    // pass
  }
  listenNewConnection(): Observable<string> {
    return;
  }
  listenNewDisconnection(): Observable<string> {
    return;
  }
}
