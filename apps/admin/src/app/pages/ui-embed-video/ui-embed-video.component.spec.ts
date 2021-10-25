import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiEmbedVideoComponent } from './ui-embed-video.component';
import { UiModule } from '@valor-launchpad/ui';

describe('UiEmbedVideoComponent', () => {
  let component: UiEmbedVideoComponent;
  let fixture: ComponentFixture<UiEmbedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UiEmbedVideoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiEmbedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
