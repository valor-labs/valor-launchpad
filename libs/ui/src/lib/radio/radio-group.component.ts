import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  HostBinding,
  Injector,
  OnInit,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { RadioComponent } from './radio.component';

@Component({
  selector: 'valor-launchpad-radio-group',
  template: `
    <ng-content></ng-content>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    },
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, OnInit, AfterContentInit {
  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent>;
  @HostBinding('class.is-invalid') get isDirtyAndInvalid(): boolean {
    if (!this.ngControl) {
      return false;
    }
    return (this.ngControl.dirty || this.ngControl.touched) && this.ngControl.invalid;
  }

  private value: never;
  private ngControl: NgControl;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: any) => null;
  onTouched = () => null;

  constructor(private injector: Injector) {
  }

  writeValue(value: never): void {
    this.value = value;
    Promise.resolve().then(() => {
      this.radios.forEach(item => {
        item.isChecked = item.value === value;
      })
    });
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  ngAfterContentInit() {
    this.radios.forEach((item) => {
      item.registerOnChange((checked, value) => {
        this.refreshCheckedStatus(value);
      })
    })
  }

  private refreshCheckedStatus(value) {
    this.onChange(value);
    this.radios.forEach(item => {
      item.isChecked = item.value === value;
    })
  }

}
