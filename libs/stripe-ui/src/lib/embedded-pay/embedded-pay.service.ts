import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AllCountriesResponse } from '@valor-launchpad/stripe-api';

@Injectable({providedIn: 'root'})
export class EmbeddedPayService {
  constructor(private http: HttpClient) {
  }

  getProducts() {
    return of(PRODUCTS).pipe(delay(10));
  }

  getPaymentIntents() {
    return this.http.post('/api/stripe/v1/payment_intents', {});
  }

  getAllCountries() {
    return this.http.get<AllCountriesResponse>('/api/stripe/v1/countries');
  }

  getPayMethodsByCountry(country) {
    return this.http.get(`/api/stripe/v1/countries/${country}/pay-methods`)
  }
}

const PRODUCTS = [
  {
    'id': 'pins',
    'object': 'product',
    'active': true,
    'attributes': [
      'set'
    ],
    'caption': null,
    'created': 1513848330,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Stripe Pins',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'pins-collector',
          'object': 'sku',
          'active': true,
          'attributes': {
            'set': 'Collector Set'
          },
          'created': 1513848331,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': 500,
            'type': 'finite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 799,
          'product': 'pins',
          'updated': 1576268151
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=pins&active=true'
    },
    'type': 'good',
    'updated': 1552591126,
    'url': null
  },
  {
    'id': 'shirt',
    'object': 'product',
    'active': true,
    'attributes': [
      'size',
      'gender'
    ],
    'caption': null,
    'created': 1513848329,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Stripe Shirt',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'shirt-small-woman',
          'object': 'sku',
          'active': true,
          'attributes': {
            'size': 'Small Standard',
            'gender': 'Woman'
          },
          'created': 1513848329,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': null,
            'type': 'infinite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 999,
          'product': 'shirt',
          'updated': 1576255903
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=shirt&active=true'
    },
    'type': 'good',
    'updated': 1513848329,
    'url': null
  },
  {
    'id': 'increment',
    'object': 'product',
    'active': true,
    'attributes': [
      'issue'
    ],
    'caption': null,
    'created': 1513848327,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Increment Magazine',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'increment-03',
          'object': 'sku',
          'active': true,
          'attributes': {
            'issue': 'Issue #3 “Development”'
          },
          'created': 1513848328,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': null,
            'type': 'infinite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 399,
          'product': 'increment',
          'updated': 1576267451
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=increment&active=true'
    },
    'type': 'good',
    'updated': 1553885845,
    'url': null
  }
];
