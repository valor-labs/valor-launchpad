import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AllProductsResponse,
  MethodsByCountryResponse,
} from '@valor-launchpad/stripe-api';
import {ENV_CONFIG, EnvironmentConfig} from '@valor-launchpad/http';

@Injectable({providedIn: 'root'})
export class EmbeddedPayService {
  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<AllProductsResponse>(this.config.environment.apiBase + 'api/stripe/v1/products');
  }

  getPaymentIntents() {
    return this.http.post(this.config.environment.apiBase + 'api/stripe/v1/payment_intents', {});
  }

  getPayMethodsByCountry(country: string, currency: string) {
    return this.http.get<MethodsByCountryResponse>(
      this.config.environment.apiBase + `api/stripe/v1/countries/${country}/pay-methods/${currency}`
    );
  }
}
