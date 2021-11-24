import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessageVo } from '@valor-launchpad/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { SocketService } from '../socket/socket.service';

@Injectable({ providedIn: 'root' })
export class MessageSocketService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private socketService: SocketService
  ) {}

  fetchUnreadMessages() {
    return this.http.get<ChatMessageVo[]>(
      `${this.apiBase}api/chat/v1/unreadMessages`
    );
  }

  listenNewMessage() {
    return new Observable<ChatMessageVo>((subscriber) => {
      this.socketService.socket.on('newMessage', (message) => {
        subscriber.next(message);
      });
    });
  }
}
