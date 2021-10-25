import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonsComponent } from './ui-buttons.component';
import { UiModule } from '@valor-launchpad/ui';

describe('UiButtonsComponent', () => {
  let component: UiButtonsComponent;
  let fixture: ComponentFixture<UiButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UiButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
