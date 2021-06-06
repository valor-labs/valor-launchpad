import { AfterContentInit, Component, ContentChildren, forwardRef, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent>;

  private value: never;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: any) => null;
  onTouched = () => null;

  writeValue(value: never): void {
    this.value = value;
    setTimeout(() => {
      this.refreshCheckedStatus(value);
    });
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
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
