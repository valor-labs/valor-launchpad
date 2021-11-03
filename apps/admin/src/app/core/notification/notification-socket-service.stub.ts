import { INotificationSocketService } from './notification-socket.service';
import { Observable, of, Subject } from 'rxjs';
import { NotificationVo } from '@valor-launchpad/api-interfaces';

export class NotificationSocketServiceStub
  implements INotificationSocketService
{
  source = new Subject<NotificationVo>();

  connect() {
    // pass
  }

  fetchNotifications(): Observable<NotificationVo[]> {
    return of([]);
  }

  listenNewNotification(): Observable<NotificationVo> {
    return this.source.asObservable();
  }

  markAllAsRead(): Observable<unknown> {
    return of(null);
  }
}
