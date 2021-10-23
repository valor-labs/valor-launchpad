import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTabsComponent } from './ui-tabs.component';
import { UiModule } from '@valor-launchpad/ui';

describe('UiTabsComponent', () => {
  let component: UiTabsComponent;
  let fixture: ComponentFixture<UiTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [UiTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
