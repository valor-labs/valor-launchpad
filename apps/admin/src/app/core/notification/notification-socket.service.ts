import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import {
  NotificationPaginatedListVo,
  NotificationVo,
} from '@valor-launchpad/api-interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';

export interface INotificationSocketService {
  listenNewNotification(): Observable<NotificationVo>;
  fetchNotifications(): Observable<NotificationPaginatedListVo>;
  markAllAsRead(): Observable<unknown>;
}

@Injectable({ providedIn: 'root' })
export class NotificationSocketService implements INotificationSocketService {
  private socket = this.socketService.socket;
  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private socketService: SocketService
  ) {}

  listenNewNotification() {
    return new Observable<NotificationVo>((subscriber) => {
      this.socket.on('newNotification', (message) => {
        subscriber.next(message);
      });
    });
  }

  fetchNotifications() {
    let params = new HttpParams();
    params = params.append('read', 'false');
    return this.http.get<NotificationPaginatedListVo>(
      this.config.environment.apiBase + 'api/notifications/v1',
      { params }
    );
  }

  markAllAsRead() {
    return this.http.post(
      this.config.environment.apiBase + 'api/notifications/v1/markAsRead',
      {}
    );
  }
}
