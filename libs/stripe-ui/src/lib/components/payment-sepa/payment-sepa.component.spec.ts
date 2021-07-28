import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSepaComponent } from './payment-sepa.component';

describe('PaymentSepaComponent', () => {
  let component: PaymentSepaComponent;
  let fixture: ComponentFixture<PaymentSepaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentSepaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
