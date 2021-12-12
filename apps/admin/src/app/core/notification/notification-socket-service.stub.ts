import { INotificationSocketService } from './notification-socket.service';
import { Observable, of, Subject } from 'rxjs';
import {
  NotificationPaginatedListVo,
  NotificationVo,
} from '@valor-launchpad/api-interfaces';

export class NotificationSocketServiceStub
  implements INotificationSocketService
{
  source = new Subject<NotificationVo>();

  fetchNotifications(): Observable<NotificationPaginatedListVo> {
    return of({ data: [], page: { total: 0, pageSize: 10, pageIndex: 1 } });
  }

  listenNewNotification(): Observable<NotificationVo> {
    return this.source.asObservable();
  }

  markAllAsRead(): Observable<unknown> {
    return of(null);
  }
}
