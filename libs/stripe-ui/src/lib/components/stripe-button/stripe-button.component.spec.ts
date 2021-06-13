import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeButtonComponent } from './stripe-button.component';

describe('StripeButtonComponent', () => {
  let component: StripeButtonComponent;
  let fixture: ComponentFixture<StripeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
