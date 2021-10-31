import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStoryComponent } from './social-story.component';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IStory } from '../dashboard-social.model';
import { UiModule } from '@valor-launchpad/ui';

const MOCK_STORY: IStory = {
  createdDate: new Date('2021-10-01'),
  mediaAsset: [{ src: '', alt: '' }],
  deletedDate: null,
  id: '',
  userId: '',
  user: {
    firstName: 'John',
    lastName: 'Snow',
    avatar: { src: '', alt: '' },
  },
  content: '',
  comments: [],
  likedByYou: true,
};

describe('DashboardSocialStoryComponent', () => {
  let component: SocialStoryComponent;
  let fixture: ComponentFixture<SocialStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        UiModule,
      ],
      declarations: [SocialStoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStoryComponent);
    component = fixture.componentInstance;
    component.story = MOCK_STORY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
