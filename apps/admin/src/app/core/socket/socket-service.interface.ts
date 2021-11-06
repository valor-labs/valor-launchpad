import { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

export interface ISocketService {
  socket: Socket;
  connect(): void;
  disconnect(): void;
  listenNewConnection(): Observable<string>;
  listenNewDisconnection(): Observable<string>;
}
