import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownComponent } from './notification-dropdown.component';
import {
  INotificationSocketService,
  NotificationSocketService,
} from '../notification-socket.service';
import { Observable, of, Subject } from 'rxjs';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { UiModule } from '@valor-launchpad/ui';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationItemComponent } from '../notification-item/notification-item.component';

class NotificationSocketServiceStub implements INotificationSocketService {
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

describe('NotificationDropdownComponent', () => {
  let component: NotificationDropdownComponent;
  let fixture: ComponentFixture<NotificationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [
        NotificationDropdownComponent,
        NotificationListComponent,
        NotificationItemComponent,
      ],
      providers: [
        {
          provide: NotificationSocketService,
          useClass: NotificationSocketServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
