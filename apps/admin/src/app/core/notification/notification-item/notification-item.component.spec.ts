import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationItemComponent } from './notification-item.component';
import { UiModule } from '@valor-launchpad/ui';

describe('NotificationItemComponent', () => {
  let component: NotificationItemComponent;
  let fixture: ComponentFixture<NotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [NotificationItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemComponent);
    component = fixture.componentInstance;
    component.notification = {
      id: 1,
      type: 'COMMENT',
      read: false,
      extras: {
        comment: {},
        project: {},
        actingUser: { firstName: 'John', lastName: 'Snow' },
      },
      createdDate: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
