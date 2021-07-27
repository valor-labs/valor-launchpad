import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeOrderItemComponent } from './stripe-order-item.component';

describe('StripeOrderItemComponent', () => {
  let component: StripeOrderItemComponent;
  let fixture: ComponentFixture<StripeOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripeOrderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
