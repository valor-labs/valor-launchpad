import { Component, Input } from '@angular/core';
import { StripeElements } from '@stripe/stripe-js';

@Component({
  selector: 'valor-launchpad-payment-redirect',
  templateUrl: './payment-redirect.component.html',
  styleUrls: [
    '../styles/payment-way.scss',
    './payment-redirect.component.scss',
  ],
})
export class PaymentRedirectComponent {
  @Input() elements: StripeElements;
  constructor() {}
}
