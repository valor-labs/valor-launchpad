import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSocialComponent } from './dashboard-social.component';
import { UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SocialActivityComponent } from './social-activity/social-activity.component';
import { SocialStoryComponent } from './social-story/social-story.component';
import { environment } from '../../../environments/environment';
import { HttpModule } from '@valor-launchpad/http';
import { TimeAgoPipe } from './time-ago.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardSocialComponent', () => {
  let component: DashboardSocialComponent;
  let fixture: ComponentFixture<DashboardSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        BsDropdownModule,
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [
        DashboardSocialComponent,
        SocialActivityComponent,
        SocialStoryComponent,
        TimeAgoPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
