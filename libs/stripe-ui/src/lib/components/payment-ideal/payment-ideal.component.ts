import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StripeElements, StripeIdealBankElement } from '@stripe/stripe-js';
import { customStyle } from '../../custom-style';

@Component({
  selector: 'valor-launchpad-payment-ideal',
  templateUrl: './payment-ideal.component.html',
  styleUrls: ['../styles/payment-way.scss'],
  exportAs: 'paymentIdeal',
})
export class PaymentIdealComponent implements OnInit, OnDestroy {
  @Input() elements: StripeElements;

  idealBank: StripeIdealBankElement;

  ngOnInit(): void {
    this.idealBank = this.elements.create('idealBank', {
      style: {
        base: Object.assign({ padding: '10px 15px' }, customStyle.base),
      },
    });
    // Mount the iDEAL Bank Element on the page.
    this.idealBank.mount('#ideal-bank-element');
  }

  ngOnDestroy() {
    this.idealBank.destroy();
  }
}
