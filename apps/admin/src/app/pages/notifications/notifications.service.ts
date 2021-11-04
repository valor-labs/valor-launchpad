import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { NotificationPaginatedListVo } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
  ) {}

  getNotifications(pageIndex: number, pageSize) {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);
    return this.http.get<NotificationPaginatedListVo>(
      `${this.apiBase}api/notifications/v1`,
      { params }
    );
  }

  markAsRead(notificationIds: number[]) {
    return this.http.post(`${this.apiBase}api/notifications/v1/markAsRead`, {
      notificationIds,
    });
  }
}
