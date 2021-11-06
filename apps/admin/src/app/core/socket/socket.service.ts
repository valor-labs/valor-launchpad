import { Inject, Injectable } from '@angular/core';
import { ISocketService } from './socket-service.interface';
import { io, Socket } from 'socket.io-client';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements ISocketService {
  socket: Socket;
  get socketId() {
    return this.socket.id;
  }
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private cookieService: CookieService
  ) {}

  connect() {
    this.socket = io(`${this.config.environment.apiBase}`, {
      extraHeaders: { Authorization: this.cookieService.get('access_token') },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: this.cookieService.get('access_token'),
          },
        },
      },
    });
    this.socket.on('connect', () => {
      console.log('Socket connected successfully');
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }

  listenNewConnection() {
    return new Observable<string>((subscriber) => {
      this.socket.on('userConnected', (userId) => {
        subscriber.next(userId);
      });
    });
  }

  listenNewDisconnection() {
    return new Observable<string>((subscriber) => {
      this.socket.on('userDisconnected', (userId) => {
        subscriber.next(userId);
      });
    });
  }
}
