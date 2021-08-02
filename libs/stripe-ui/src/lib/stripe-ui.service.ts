import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AllCountriesResponse,
  CheckoutSessionInput,
  CheckoutSessionResponse,
  PaymentIndentsInput,
  PaymentIndentsResponse,
  PaymentIntentsStatusResponse,
  PaymentSourceInput,
  PaymentSourceResponse,
  PaymentSourceStatusResponse,
} from '@valor-launchpad/stripe-api';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StripeUiService {
  constructor(private http: HttpClient) {}
  getAllCountries() {
    return this.http.get<AllCountriesResponse>('/api/stripe/v1/countries');
  }

  loopFormGroup(group: FormGroup) {
    for (const key of Object.keys(group.controls)) {
      group.controls[key].markAsDirty();
      group.controls[key].updateValueAndValidity({ emitEvent: false });
    }
  }

  getPaymentIndent(input: PaymentIndentsInput) {
    return this.http.post<PaymentIndentsResponse>(
      '/api/stripe/v1/payment_intents',
      input
    );
  }

  getPaymentSource(input: PaymentSourceInput) {
    return this.http.post<PaymentSourceResponse>(
      '/api/stripe/v1/payment_source',
      input
    );
  }

  getPaymentIndentsStatus(intent: string) {
    return this.http.get<PaymentIntentsStatusResponse>(
      `/api/stripe/v1/payment_intents/${intent}/status`
    );
  }

  getPaymentSourceStatus(source: string) {
    return this.http.get<PaymentSourceStatusResponse>(
      `/api/stripe/v1/payment_source/${source}/status`
    );
  }

  getCheckoutSession(sessionId: string) {
    return this.http.get(`/api/stripe/v1/checkout_session/${sessionId}`);
  }

  createCheckoutSession(input: CheckoutSessionInput) {
    return this.http.post<CheckoutSessionResponse>(
      '/api/stripe/v1/create-checkout-session',
      input
    );
  }
}
