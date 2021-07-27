import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StripeElements, StripeIbanElement } from '@stripe/stripe-js';
import { customStyle } from '../../custom-style';

@Component({
  selector: 'valor-launchpad-payment-sepa',
  templateUrl: './payment-sepa.component.html',
  styleUrls: ['../styles/payment-way.scss'],
  exportAs: 'paymentSepa',
})
export class PaymentSepaComponent implements OnInit, OnDestroy {
  @Input() elements: StripeElements;

  iban: StripeIbanElement;

  ngOnInit(): void {
    this.iban = this.elements.create('iban', {
      style: customStyle,
      supportedCountries: ['SEPA'],
    });
    this.iban.mount('#iban-element');
  }

  ngOnDestroy() {
    this.iban.destroy();
  }
}
