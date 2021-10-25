import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTypographyComponent } from './ui-typography.component';
import { UiModule } from '@valor-launchpad/ui';

describe('UiTypographyComponent', () => {
  let component: UiTypographyComponent;
  let fixture: ComponentFixture<UiTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UiTypographyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
