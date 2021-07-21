import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentP24Component } from './payment-p24.component';

describe('PaymentP24Component', () => {
  let component: PaymentP24Component;
  let fixture: ComponentFixture<PaymentP24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentP24Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentP24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
