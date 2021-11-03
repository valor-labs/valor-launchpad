import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropdownComponent } from './notification-dropdown.component';
import { NotificationSocketService } from '../notification-socket.service';
import { UiModule } from '@valor-launchpad/ui';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { NotificationSocketServiceStub } from '../notification-socket-service.stub';

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
