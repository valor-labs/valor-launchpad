import { Directive, HostBinding, Input } from '@angular/core';

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
}
