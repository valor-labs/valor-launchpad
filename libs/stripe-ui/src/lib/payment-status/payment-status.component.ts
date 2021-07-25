import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeUiService } from '../stripe-ui.service';
import type { Source } from '@stripe/stripe-js';
import { fmtCurrency } from '../utils';

interface PaymentStatusRouteParam {
  payment_intent?: string;
  payment_source?: string;
}

@Component({
  selector: 'valor-launchpad-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
  status: 'success' | 'processing' | 'receiver' | 'error';
  errorMessage =
    'The provided PaymentMethod has failed authentication. You can provide payment_method_data or a new PaymentMethod to attempt to fulfill this PaymentIntent again.';
  multibanco: Source.Multibanco;
  achCreditTransfer: Source.AchCreditTransfer;
  amount: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private stripeUiService: StripeUiService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot
      .queryParams as PaymentStatusRouteParam;

    // TODO: add recursive to pull status
    if (Reflect.has(params, 'payment_intent')) {
      this.stripeUiService
        .getPaymentIndentsStatus(params.payment_intent)
        .subscribe((res) => {
          if (res.status === 'succeeded') {
            this.status = 'success';
          } else if (res.status === 'processing') {
            this.status = 'processing';
          } else {
            this.status = 'error';
          }

          if (res.last_payment_error) {
            this.errorMessage = res.last_payment_error.message;
          }
        });
    } else if (Reflect.has(params, 'payment_source')) {
      this.stripeUiService
        .getPaymentSourceStatus(params.payment_source)
        .subscribe((res) => {
          // The status of the source, one of canceled, chargeable, consumed, failed, or pending. Only chargeable sources can be used to create a charge.
          this.multibanco = res.multibanco;
          this.achCreditTransfer = res.ach_credit_transfer;
          this.amount = fmtCurrency(res.amount, res.currency);
          if (res.status === 'pending') {
            this.status = 'receiver';
          } else if (res.status === 'chargeable') {
            this.status = 'receiver';
          } else if (res.status === 'failed') {
            this.status = 'error';
          }
        });
    }
  }
}
