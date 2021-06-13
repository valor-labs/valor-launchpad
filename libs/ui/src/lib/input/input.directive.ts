import { Directive, Host, HostBinding, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormItemComponent } from '../forms/form-item.component';

@Directive({
  selector: 'input[valorLaunchpadInput],textarea[valorLaunchpadInput]',
  exportAs: 'valorLaunchpadInput',
})
export class InputDirective {
  @Input() vlSize: 'large' | 'medium' | 'small' = 'medium';

  @HostBinding('class.form-control') private basicClass = true;

  @HostBinding('class.form-control-lg') get lg() {
    return this.vlSize === 'large';
  }

  @HostBinding('class.form-control-sm') get sm() {
    return this.vlSize === 'small';
  }

  @HostBinding('class.is-invalid') get isDirtyAndInvalid(): boolean {
    if (!this.ngControl) {
      return false;
    }
    return this.ngControl.dirty && this.ngControl.invalid;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() private formItemComponent: FormItemComponent,
    ) {
  }
}
