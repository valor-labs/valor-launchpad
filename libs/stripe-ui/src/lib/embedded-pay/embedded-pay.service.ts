import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AllProductsResponse,
  MethodsByCountryResponse,
} from '@valor-launchpad/stripe-api';

@Injectable({ providedIn: 'root' })
export class EmbeddedPayService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<AllProductsResponse>('/api/stripe/v1/products');
  }

  getPaymentIntents() {
    return this.http.post('/api/stripe/v1/payment_intents', {});
  }

  getPayMethodsByCountry(country) {
    return this.http.get<MethodsByCountryResponse>(
      `/api/stripe/v1/countries/${country}/pay-methods`
    );
  }
}
