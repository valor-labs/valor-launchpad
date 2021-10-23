import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDefaultComponent } from './payment-default.component';
import { UiModule } from '@valor-launchpad/ui';

describe('PaymentDefaultComponent', () => {
  let component: PaymentDefaultComponent;
  let fixture: ComponentFixture<PaymentDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [PaymentDefaultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
