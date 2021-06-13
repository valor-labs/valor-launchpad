import { Component, HostBinding } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[stripe-button]',
  templateUrl: './stripe-button.component.html',
  styleUrls: ['./stripe-button.component.scss'],
})
export class StripeButtonComponent {
  @HostBinding('class.stripe-payment-button') basicClass = true;
}
