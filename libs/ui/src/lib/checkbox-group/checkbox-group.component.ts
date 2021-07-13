import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {VLCheckBoxOption} from './VLCheckBoxOption.interface';

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
export class CheckboxGroupComponent implements ControlValueAccessor {
  @Input() options: VLCheckBoxOption[] = [];
  @Input() inline = false;

  checkedItems = new Set<string>();

  onTouched: () => void = () => null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (arg: string[]) => null;

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
