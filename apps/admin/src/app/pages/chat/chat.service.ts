import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { HttpClient } from '@angular/common/http';
import { ChatMessageVo, ChatThreadVo } from '@valor-launchpad/api-interfaces';
import { Observable } from 'rxjs';
import { SocketService } from '../../core/socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiBase = this.config.environment.apiBase;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private readonly httpClient: HttpClient,
    private readonly socketService: SocketService
  ) {}

  listenNewMessage() {
    return new Observable<ChatMessageVo>((subscriber) => {
      this.socketService.socket.on('newMessage', (message) => {
        subscriber.next(message);
      });
    });
  }

  fetchThreads() {
    return this.httpClient.get<ChatThreadVo[]>(
      `${this.apiBase}api/chat/v1/threads`
    );
  }

  fetchThreadMessages(threadId: string) {
    return this.httpClient.get<ChatMessageVo[]>(
      `${this.apiBase}api/chat/v1/threads/${threadId}/messages`
    );
  }

  sendMessage(threadId: string, message: string, socketId: string) {
    return this.httpClient.post<ChatMessageVo>(
      `${this.apiBase}api/chat/v1/threads/${threadId}/messages`,
      { message, socketId }
    );
  }

  markThreadAsRead(threadId: string) {
    return this.httpClient.post(
      `${this.apiBase}api/chat/v1/threads/${threadId}/markAsRead`,
      {}
    );
  }
}
