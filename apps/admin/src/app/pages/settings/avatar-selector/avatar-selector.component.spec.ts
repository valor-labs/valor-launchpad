import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSelectorComponent } from './avatar-selector.component';
import { UiModule } from '@valor-launchpad/ui';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';

describe('AvatarSelectorComponent', () => {
  let component: AvatarSelectorComponent;
  let fixture: ComponentFixture<AvatarSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, HttpModule.forRoot({ environment })],
      declarations: [AvatarSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarSelectorComponent);
    component = fixture.componentInstance;
    component.previewSrc = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
