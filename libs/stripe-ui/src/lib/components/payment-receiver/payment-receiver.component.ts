import { Component, Input } from '@angular/core';
import { StripeElements } from '@stripe/stripe-js';

@Component({
  selector: 'valor-launchpad-payment-receiver',
  templateUrl: './payment-receiver.component.html',
  styleUrls: [
    '../styles/payment-way.scss',
    './payment-receiver.component.scss',
  ],
})
export class PaymentReceiverComponent {
  @Input() elements: StripeElements;
}
