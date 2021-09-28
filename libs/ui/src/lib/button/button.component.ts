import { Attribute, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ButtonSize, ButtonTheme } from './button.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[valor-launchpad-button], a[valor-launchpad-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  // use @Attribute instead of @Input to remove no-necessary bind event
  // https://netbasal.com/getting-to-know-the-attribute-decorator-in-angular-4f7c9fb61243
  constructor(
    @Attribute('theme') public theme: ButtonTheme = 'primary',
    @Attribute('theme') public size: ButtonSize = 'md'
  ) {
  }

  @Input() outlined = false;

  @HostBinding('class.btn') private btn = true;

  @HostBinding('class.btn-pill') @Input() rounded = false;
  @HostBinding('class.btn-square') @Input() squared = false;

  @HostBinding('class.btn-primary')
  private get isPrimary() {
    return this.theme === 'primary' && !this.outlined;
  }

  @HostBinding('class.btn-secondary')
  private get isSecondary() {
    return this.theme === 'secondary' && !this.outlined;
  }

  @HostBinding('class.btn-success')
  private get isSuccess() {
    return this.theme === 'success' && !this.outlined;
  }

  @HostBinding('class.btn-danger')
  private get isDanger() {
    return this.theme === 'danger' && !this.outlined;
  }

  @HostBinding('class.btn-warning')
  private get isWarning() {
    return this.theme === 'warning' && !this.outlined;
  }

  @HostBinding('class.btn-info')
  private get isInfo() {
    return this.theme === 'info' && !this.outlined;
  }

  @HostBinding('class.btn-light')
  private get isLight() {
    return this.theme === 'light' && !this.outlined;
  }

  @HostBinding('class.btn-outline-primary')
  private get isOutLinedPrimary() {
    return this.theme === 'primary' && this.outlined;
  }

  @HostBinding('class.btn-outline-secondary')
  private get isOutLinedSecondary() {
    return this.theme === 'secondary' && this.outlined;
  }

  @HostBinding('class.btn-outline-success')
  private get isOutLinedSuccess() {
    return this.theme === 'success' && this.outlined;
  }

  @HostBinding('class.btn-outline-danger')
  private get isOutLinedDanger() {
    return this.theme === 'danger' && this.outlined;
  }

  @HostBinding('class.btn-outline-warning')
  private get isOutLinedWarning() {
    return this.theme === 'warning' && this.outlined;
  }

  @HostBinding('class.btn-outline-info')
  private get isOutLinedInfo() {
    return this.theme === 'info' && this.outlined;
  }

  @HostBinding('class.btn-sm')
  private get isSmall() {
    return this.size === 'sm';
  }

  @HostBinding('class.btn-lg')
  private get isLarge() {
    return this.size === 'lg';
  }

  @HostBinding('class.spinner')
  @HostBinding('class.disabled')
  @Input() loading = false;
}
