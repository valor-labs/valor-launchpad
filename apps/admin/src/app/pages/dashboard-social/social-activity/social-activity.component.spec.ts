import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialActivityComponent } from './social-activity.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ISocialActivityItem } from '../dashboard-social.model';
import { TimeAgoPipe } from '../time-ago.pipe';

const MOCK_ACTIVITY: ISocialActivityItem = {
  storyId: 'storyId',
  operatorAvatarSrc: 'operatorAvatarSrc',
  createdDate: new Date('2021-10-01').toISOString(),
  deletedDate: null,
  operatorFullName: 'operatorFullName',
  operator: { username: 'operator' },
  targetUser: { username: 'targetUser' },
  action: 'FOLLOWED',
  targetUserId: 'targetUserId',
  targetUserFullName: 'targetUserFullName',
  id: 12,
  targetUserAvatarSrc: 'targetUserAvatarSrc',
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
      imports: [RouterTestingModule],
      declarations: [SocialActivityComponent, TimeAgoPipe],
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
