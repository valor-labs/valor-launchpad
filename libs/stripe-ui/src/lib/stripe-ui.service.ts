import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AllCountriesResponse,
  PaymentIndentsInput,
  PaymentSourceInput,
  PaymentSourceResponse,
} from '@valor-launchpad/stripe-api';
import { FormGroup } from '@angular/forms';
import { PaymentIntent } from '@stripe/stripe-js';

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
    return this.http.post<PaymentIntent>(
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
}
