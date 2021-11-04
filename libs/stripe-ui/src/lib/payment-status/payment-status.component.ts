import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeUiService } from '../stripe-ui.service';
import type { Source } from '@stripe/stripe-js';
import { fmtCurrency } from '../utils';
import { delay, filter, repeatWhen, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface PaymentStatusRouteParam {
  payment_intent?: string;
  payment_source?: string;
  session_id?: string;
}
type PaymentStatus = 'success' | 'processing' | 'receiver' | 'error';
const pollTimeInterval = 3000; // 3s

@Component({
  selector: 'valor-launchpad-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
  status$ = new Subject<PaymentStatus>();
  errorMessage =
    'The provided PaymentMethod has failed authentication. You can provide payment_method_data or a new PaymentMethod to attempt to fulfill this PaymentIntent again.';
  multibanco: Source.Multibanco;
  achCreditTransfer: Source.AchCreditTransfer;
  wechat: Source.Wechat;
  amount: string;
  @ViewChild('wechatQrcode') wechatQrcodeEl: ElementRef<HTMLElement>;

  private destroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private stripeUiService: StripeUiService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot
      .queryParams as PaymentStatusRouteParam;

    if (Reflect.has(params, 'payment_intent')) {
      this.stripeUiService
        .getPaymentIndentsStatus(params.payment_intent)
        .pipe(
          repeatWhen((obs) => obs.pipe(delay(pollTimeInterval))),
          takeUntil(this.destroyed$),
          takeUntil(this.status$.pipe(filter((s) => s !== 'processing')))
        )
        .subscribe((res) => {
          if (res.status === 'succeeded') {
            this.status$.next('success');
          } else if (res.status === 'processing') {
            this.status$.next('processing');
          } else {
            this.status$.next('error');
          }

          if (res.last_payment_error) {
            this.errorMessage = res.last_payment_error.message;
          }
        });
    } else if (Reflect.has(params, 'payment_source')) {
      this.stripeUiService
        .getPaymentSourceStatus(params.payment_source)
        .pipe(
          repeatWhen((obs) => obs.pipe(delay(pollTimeInterval))),
          takeUntil(this.destroyed$),
          takeUntil(this.status$.pipe(filter((s) => s !== 'receiver')))
        )
        .subscribe((res) => {
          // The status of the source, one of canceled, chargeable, consumed, failed, or pending. Only chargeable sources can be used to create a charge.
          this.multibanco = res.multibanco;
          this.achCreditTransfer = res.ach_credit_transfer;
          this.wechat = res.wechat;
          this.amount = fmtCurrency(res.amount, res.currency);
          if (res.status === 'pending') {
            this.status$.next('receiver');
          } else if (res.status === 'chargeable') {
            this.status$.next('success');
          } else if (res.status === 'failed') {
            this.status$.next('error');
          }
        });
    } else if (Reflect.has(params, 'session_id')) {
      this.stripeUiService.getCheckoutSession(params.session_id).subscribe(() => {
        this.status$.next('success');
      });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
