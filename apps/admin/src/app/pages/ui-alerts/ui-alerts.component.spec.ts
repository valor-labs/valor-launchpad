import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAlertsComponent } from './ui-alerts.component';
import { UiModule } from '@valor-launchpad/ui';

describe('UiAlertsComponent', () => {
  let component: UiAlertsComponent;
  let fixture: ComponentFixture<UiAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UiAlertsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
