import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNotificationsComponent } from './ui-notifications.component';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';

describe('UiNotificationsComponent', () => {
  let component: UiNotificationsComponent;
  let fixture: ComponentFixture<UiNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, ReactiveFormsModule],
      declarations: [UiNotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
