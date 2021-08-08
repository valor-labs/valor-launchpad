import { Component, forwardRef, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { VLCheckBoxOption } from './VLCheckBoxOption.interface';

@Component({
  selector: 'valor-launchpad-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor, OnInit {
  @Input() options: VLCheckBoxOption[] = [];
  @Input() inline = false;

  @HostBinding('class.is-invalid') get isDirtyAndInvalid(): boolean {
    if (!this.ngControl) {
      return false;
    }
    return (this.ngControl.dirty || this.ngControl.touched) && this.ngControl.invalid;
  }
  checkedItems = new Set<string>();

  private ngControl: NgControl;

  onTouched: () => void = () => null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (arg: string[]) => null;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl)
  }

  trackByOption(_: number, option: VLCheckBoxOption): string {
    return option.value;
  }

  nativeChange(option: VLCheckBoxOption, evt): void {
    const checked = (evt.target as HTMLInputElement).checked;
    if (checked) {
      this.checkedItems.add(option.value);
    } else {
      this.checkedItems.delete(option.value);
    }
    this.onChange(Array.from(this.checkedItems));
  }

  writeValue(value: string[] | null): void {
    for (const i of value || []) {
      this.checkedItems.add(i);
    }
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
}
