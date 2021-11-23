import {Component, HostBinding, Input} from '@angular/core';

export type BadgeTheme = 'primary' |
  'secondary' |
  'success' |
  'danger' |
  'warning' |
  'info';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[valor-launchpad-badge]',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @HostBinding('class.badge') private btn = true;
  @HostBinding('class.rounded-pill') @Input() rounded = false;
  @Input() theme: BadgeTheme = 'primary';

  @HostBinding('class.bg-primary') private get isPrimary() {
    return this.theme === 'primary';
  }

  @HostBinding('class.bg-secondary') private get isSecondary() {
    return this.theme === 'secondary';
  }

  @HostBinding('class.bg-success') private get isSuccess() {
    return this.theme === 'success';
  }

  @HostBinding('class.bg-danger') private get isDanger() {
    return this.theme === 'danger';
  }
  @HostBinding('class.bg-warning') private get isWarning() {
    return this.theme === 'warning';
  }
  @HostBinding('class.bg-info') private get isInfo() {
    return this.theme === 'info';
  }
}
