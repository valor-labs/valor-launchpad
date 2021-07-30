import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiverComponent } from './payment-receiver.component';

describe('PaymentReceiverComponent', () => {
  let component: PaymentReceiverComponent;
  let fixture: ComponentFixture<PaymentReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentReceiverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
