import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorLaunchpadMessengerComponent } from './valor-launchpad-messenger.component';

describe('ValorLaunchpadMessengerComponent', () => {
  let component: ValorLaunchpadMessengerComponent;
  let fixture: ComponentFixture<ValorLaunchpadMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValorLaunchpadMessengerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorLaunchpadMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
