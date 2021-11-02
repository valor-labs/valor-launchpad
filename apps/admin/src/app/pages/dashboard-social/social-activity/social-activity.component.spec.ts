import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialActivityComponent } from './social-activity.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ISocialActivityItem } from '../dashboard-social.model';
import { UiModule } from '@valor-launchpad/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';

const MOCK_ACTIVITY: ISocialActivityItem = {
  storyId: 'storyId',
  createdDate: new Date('2021-10-01').toISOString(),
  deletedDate: null,
  operator: {
    username: 'operator',
    firstName: 'operator',
    lastName: 'operator',
    profile: {
      avatar: {
        src: '',
        src_webp: '',
        alt: '',
      },
    },
  },
  targetUser: {
    username: 'operator',
    firstName: 'operator',
    lastName: 'operator',
    profile: {
      avatar: {
        src: '',
        src_webp: '',
        alt: '',
      },
    },
  },
  action: 'FOLLOWED',
  id: 12,
  targetUserId: 'targetUserId',
  operatorId: 'operatorId',
  story: {
    content: '123',
    mediaAsset: [{ src: '', alt: '' }],
  },
};

describe('SocialActivityComponent', () => {
  let component: SocialActivityComponent;
  let fixture: ComponentFixture<SocialActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UiModule,
        HttpClientTestingModule,
        HttpModule.forRoot({ environment }),
      ],
      declarations: [SocialActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialActivityComponent);
    component = fixture.componentInstance;
    component.activity = MOCK_ACTIVITY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
