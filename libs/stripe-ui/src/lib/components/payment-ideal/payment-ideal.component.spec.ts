import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentIdealComponent } from './payment-ideal.component';

describe('PaymentIdealComponent', () => {
  let component: PaymentIdealComponent;
  let fixture: ComponentFixture<PaymentIdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentIdealComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentIdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
