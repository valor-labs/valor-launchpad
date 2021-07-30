import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeOrderItemsComponent } from './stripe-order-items.component';

describe('StripeOrderComponent', () => {
  let component: StripeOrderItemsComponent;
  let fixture: ComponentFixture<StripeOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripeOrderItemsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
