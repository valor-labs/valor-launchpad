import { Component, forwardRef, HostBinding, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'label[valor-launchpad-checkbox]',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() vlDisabled = false;
  @HostBinding('class.form-check') basicClass = true;
  @HostBinding('class.is-invalid') get isDirtyAndInvalid(): boolean {
    if (!this.ngControl) {
      return false;
    }
    return (this.ngControl.dirty || this.ngControl.touched) && this.ngControl.invalid;
  }

  checked: boolean;

  private ngControl: NgControl;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (val: boolean) => null;
  onTouch = () => null;

  @HostListener('click', ['$event'])
  onClick(evt: Event): void {
    evt.preventDefault();
    if (!this.vlDisabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  writeValue(value: boolean) {
    this.checked = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

}
