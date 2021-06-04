import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDefaultComponent } from './payment-default.component';

describe('PaymentDefaultComponent', () => {
  let component: PaymentDefaultComponent;
  let fixture: ComponentFixture<PaymentDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDefaultComponent ]
    })
    .compileComponents();
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
