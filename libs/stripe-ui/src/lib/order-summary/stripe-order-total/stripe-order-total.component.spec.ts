import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeOrderTotalComponent } from './stripe-order-total.component';

describe('StripeOrderTotalComponent', () => {
  let component: StripeOrderTotalComponent;
  let fixture: ComponentFixture<StripeOrderTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeOrderTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeOrderTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
