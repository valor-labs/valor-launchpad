import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePricingComponent } from './mobile-pricing.component';

describe('MobilePricingComponent', () => {
  let component: MobilePricingComponent;
  let fixture: ComponentFixture<MobilePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
