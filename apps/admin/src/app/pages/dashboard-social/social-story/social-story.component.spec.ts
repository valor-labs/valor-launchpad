import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStoryComponent } from './social-story.component';

describe('DashboardSocialStoryComponent', () => {
  let component: SocialStoryComponent;
  let fixture: ComponentFixture<SocialStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
