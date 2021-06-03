import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeType = (checked: boolean, value: any) => void;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[valor-launchpad-radio]',
  template: `
    <input type="radio" class="form-check-input" [checked]='isChecked' [disabled]='disabled'>
    <span class="form-check-label"><ng-content></ng-content></span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @HostBinding('class.form-check') private enabled = true;

  @Input()
  @HostBinding('class.form-check-inline')
  inline = false;

  @Input() disabled = false;

  @Input() value: any = null;

  isChecked = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: OnChangeType = (checked: boolean, value: any) => null;
  onTouched = () => null;

  @HostListener('click')
  onClick(): void {
    if (!this.disabled && !this.isChecked) {
      this.isChecked = true;
      this.onChange(this.isChecked, this.value);
    }
  }

  constructor(private el: ElementRef<HTMLLabelElement>) {
    if (el.nativeElement.tagName !== 'LABEL') {
      console.warn('valor-launchpad-radio should be used on a <label> element');
    }
  }

  writeValue(value: boolean): void {
    this.isChecked = value;
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
}
