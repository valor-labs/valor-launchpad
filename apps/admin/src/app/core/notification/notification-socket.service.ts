import { Inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { CookieService } from 'ngx-cookie-service';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface INotificationSocketService {
  connect(): void;
  listenNewNotification(): Observable<NotificationVo>;
  fetchNotifications(): Observable<NotificationVo[]>;
  markAllAsRead(): Observable<unknown>;
}

@Injectable({ providedIn: 'root' })
export class NotificationSocketService implements INotificationSocketService {
  private socket: Socket;

  constructor(
    private http: HttpClient,
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
  }

  listenNewNotification() {
    return new Observable<NotificationVo>((subscriber) => {
      this.socket.on('newNotification', (message) => {
        subscriber.next(message);
      });
    });
  }

  fetchNotifications() {
    return this.http.get<NotificationVo[]>(
      this.config.environment.apiBase + 'api/notifications/v1'
    );
  }

  markAllAsRead() {
    return this.http.post(
      this.config.environment.apiBase + 'api/notifications/v1/markAsRead',
      {}
    );
  }
}
