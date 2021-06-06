import { Component, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-switch',
  template: `
    <input class='form-check-input' type='checkbox' [checked]='isChecked' [disabled]='vlDisabled'>
    <label class='form-check-label'>
      <ng-content></ng-content>
    </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true,
  }]

})
export class SwitchComponent implements ControlValueAccessor, OnInit {
  @Input() vlDisabled = false;

  @HostBinding('class.form-check')
  @HostBinding('class.form-switch')
  private basicClasses = true;

  isChecked: boolean;

  onChange;
  onTouch;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click')
  onClick(): void {
    if (!this.vlDisabled) {
      this.isChecked = !this.isChecked;
      this.onChange(this.isChecked);
    }
  }

  writeValue(value: boolean) {
    this.isChecked = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

}
