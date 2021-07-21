import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBecsComponent } from './payment-becs.component';

describe('PaymentBecsComponent', () => {
  let component: PaymentBecsComponent;
  let fixture: ComponentFixture<PaymentBecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentBecsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
