import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChatMessageVo,
  ChatThreadVo,
  ChatUserVo,
} from '@valor-launchpad/api-interfaces';
import { Observable } from 'rxjs';
import { SocketService } from '../../core/socket/socket.service';

export interface IChatService {
  listenNewMessage(): Observable<ChatMessageVo>;

  listenTyping(): Observable<{ userId: string; threadId: string }>;

  sendTypingStatus(threadId: string): void;

  fetchThreads(): any;

  fetchThreadMessages(threadId: string): Observable<ChatMessageVo[]>;

  sendMessage(
    threadId: string,
    message: string,
    socketId: string
  ): Observable<ChatMessageVo>;

  markThreadAsRead(threadId: string): any;

  searchUser(keyword: string): any;

  createThread(threadName: string, userIds: string[], isGroup: boolean): any;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService implements IChatService {
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

  listenTyping() {
    return new Observable<{ userId: string; threadId: string }>(
      (subscriber) => {
        this.socketService.socket.on('typing', (message) => {
          subscriber.next(message);
        });
      }
    );
  }

  sendTypingStatus(threadId: string) {
    this.socketService.socket.emit('typing', { threadId });
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

  searchUser(keyword: string) {
    let params = new HttpParams();
    if (keyword && keyword.length > 0) {
      params = params.append('keyword', keyword);
    }
    return this.httpClient.get<ChatUserVo[]>(
      `${this.apiBase}api/users/v1/byName`,
      {
        params,
      }
    );
  }

  createThread(threadName: string, userIds: string[], isGroup: boolean) {
    return this.httpClient.post<ChatThreadVo>(
      `${this.apiBase}api/chat/v1/threads`,
      {
        threadName,
        userIds,
        isGroup,
      }
    );
  }
}
