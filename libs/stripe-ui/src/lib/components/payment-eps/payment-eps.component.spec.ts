import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEpsComponent } from './payment-eps.component';

describe('PaymentEpsComponent', () => {
  let component: PaymentEpsComponent;
  let fixture: ComponentFixture<PaymentEpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentEpsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
