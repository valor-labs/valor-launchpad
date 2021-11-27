import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentBadgeComponent } from './percent-badge.component';
import { Component, SimpleChange, SimpleChanges } from '@angular/core';

describe('PercentBadgeComponent', () => {
  let component: PercentBadgeComponent;
  let fixture: ComponentFixture<PercentBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initialized', () => {
    expect(component.val).toBeUndefined();
    expect(component.precision).toBeUndefined();
    expect(component.formattedVal).toBeDefined();
    expect(component.formattedVal).toBe('');
  });

  it('should have html content to be undefined', () => {
    component.val = 0.5;
    component.precision = 2;
    // test logic in ngOnchange Hook
    const val_prev_value = undefined;
    const val_curr_value = 0.5;
    const precision_prev_value = undefined;
    const precision_curr_value = 2;
    const changesObj: SimpleChanges = {
      val: new SimpleChange(val_prev_value, val_curr_value,true),
      precision: new SimpleChange(precision_prev_value, precision_curr_value, true)
    };
    component.ngOnChanges(changesObj);
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    const span = nativeElement.querySelector('span');
    console.log(component.formattedVal);
    expect(span.textContent).toEqual('+50.00%');
  });
});


@Component({
  template: `<valor-launchpad-percent-badge [val]="val" [precision]="precision"></valor-launchpad-percent-badge>`,
})
export class TestWrapperComponent {
  val = 50;
  precision = 2;
}
