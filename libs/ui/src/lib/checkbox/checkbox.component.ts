import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[valor-launchpad-checkbox]',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() vlDisabled = false;
  @HostBinding('class.form-check') basicClass = true;

  checked: boolean;

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
