import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAvatarComponent } from './thread-avatar.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ThreadAvatarComponent', () => {
  let component: ThreadAvatarComponent;
  let fixture: ComponentFixture<ThreadAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
      ],
      declarations: [ThreadAvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAvatarComponent);
    component = fixture.componentInstance;
    component.thread = USER_THREAD;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const USER_THREAD = {
  id: 'threadid1',
  name: 'string',
  isGroup: false,
  avatar: {
    src: 'string',
    src_webp: 'string',
    alt: 'string',
  },
  isConnected: true,
  targetingUser: {
    id: 'string',
    firstName: '',
    lastName: '',
    username: '',
  },
  chatThreadUsers: [
    {
      id: 'string2',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      isConnected: true,
      profile: {
        avatar: {
          src: 'string',
          src_webp: 'string',
          alt: 'string',
        },
      },
    },
  ],
  unreadMessages: ['1', '2'],
};
