import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';
import {
  AllProductsResponse,
  CheckoutSessionInput,
  MethodsByCountryResponse,
  PaymentIndentsInput,
  PaymentSourceInput,
  PayMethod,
  PayMethodID,
} from '@valor-launchpad/stripe-api';

@Injectable()
export class StripeService {
  constructor(@InjectStripe() private readonly stripe: Stripe) {}

  async createPaymentIndent(input: PaymentIndentsInput) {
    const { items, pay_method } = input;
    return this.stripe.paymentIntents.create({
      amount: this.calculateOrderAmount(items),
      currency: items[0].currency,
      payment_method_types: [pay_method],
    });
  }

  async createCheckoutSession(input: CheckoutSessionInput) {
    const session = await this.stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: ['US', 'CN'] },
      payment_method_types: ['card'],
      mode: 'payment',
      cancel_url: input.cancelUrl,
      success_url: input.successUrl,
      line_items: input.items.map((i) => ({
        price_data: {
          currency: i.currency,
          unit_amount: i.unitAmount,
          product_data: {
            name: i.productName,
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
        },
        quantity: i.quantity,
      })),
    });
    return session.url;
  }

  async findPaymentIntent(intentId: string) {
    return await this.stripe.paymentIntents.retrieve(intentId);
  }

  async createPaymentSource(input: PaymentSourceInput) {
    if (input.type === 'ach_credit_transfer') {
      return this.stripe.sources.create({
        type: input.type,
        currency: input.currency,
        owner: { email: input.email },
      });
    } else {
      return this.stripe.sources.create({
        type: input.type,
        currency: input.currency,
        owner: { email: input.email },
        amount: input.amount,
      });
    }
  }

  async findPaymentSource(sourceId: string) {
    return await this.stripe.sources.retrieve(sourceId);
  }

  async findCheckoutSession(sessionId: string) {
    return await this.stripe.checkout.sessions.retrieve(sessionId);
  }

  async findAllCountries() {
    return [
      { value: 'AU', key: 'Australia' },
      { value: 'AT', key: 'Austria' },
      { value: 'BE', key: 'Belgium' },
      { value: 'BR', key: 'Brazil' },
      { value: 'CA', key: 'Canada' },
      { value: 'CN', key: 'China' },
      { value: 'DK', key: 'Denmark' },
      { value: 'FI', key: 'Finland' },
      { value: 'FR', key: 'France' },
      { value: 'DE', key: 'Germany' },
      { value: 'HK', key: 'Hong Kong' },
      { value: 'IE', key: 'Ireland' },
      { value: 'IT', key: 'Italy' },
      { value: 'JP', key: 'Japan' },
      { value: 'LU', key: 'Luxembourg' },
      { value: 'MY', key: 'Malaysia' },
      { value: 'MX', key: 'Mexico' },
      { value: 'NL', key: 'Netherlands' },
      { value: 'NZ', key: 'New Zealand' },
      { value: 'NO', key: 'Norway' },
      { value: 'PL', key: 'Poland' },
      { value: 'PT', key: 'Portugal' },
      { value: 'SG', key: 'Singapore' },
      { value: 'ES', key: 'Spain' },
      { value: 'SE', key: 'Sweden' },
      { value: 'CH', key: 'Switzerland' },
      { value: 'GB', key: 'United Kingdom' },
      { value: 'US', key: 'United States' },
    ];
  }

  async findProducts() {
    return PRODUCTS as AllProductsResponse;
  }

  async findPayMethods(country: string, currency: string) {
    const res: PayMethod[] = [];
    for (const [methodId, methodDetail] of Object.entries(PAYMENT_METHODS) as [
      PayMethodID,
      MethodDetail
    ][]) {
      if (!Reflect.has(methodDetail, 'countries')) {
        res.push({ ...methodDetail, id: methodId });
      } else if (
        methodDetail.countries.includes(country) &&
        methodDetail.currencies.includes(currency)
      ) {
        res.push({ ...methodDetail, id: methodId });
      }
    }
    return res;
  }

  private calculateOrderAmount(items: PaymentIndentsInput['items']) {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return items.reduce(
      (prev, item) => prev + item.quantity * item.unit_amount,
      0
    );
  }
}

interface MethodDetail {
  name: string;
  flow: string;
  countries?: string[];
  currencies?: string[];
}

const USING_CURRENCY = 'eur';
// https://stripe.com/payments/payment-methods-guide
const PAYMENT_METHODS: Record<PayMethodID, MethodDetail> = {
  card: {
    name: 'Card',
    flow: 'none',
  },
  ach_credit_transfer: {
    name: 'Bank Transfer',
    flow: 'receiver',
    countries: ['US'],
    currencies: ['usd'],
  },
  alipay: {
    name: 'Alipay',
    flow: 'redirect',
    countries: ['CN', 'HK', 'SG', 'JP'],
    currencies: ['aud', 'cad', 'eur', 'gbp', 'hkd', 'jpy', 'nzd', 'sgd', 'usd'],
  },
  bancontact: {
    name: 'Bancontact',
    flow: 'redirect',
    countries: ['BE'],
    currencies: ['eur'],
  },
  eps: {
    name: 'EPS',
    flow: 'redirect',
    countries: ['AT'],
    currencies: ['eur'],
  },
  ideal: {
    name: 'iDEAL',
    flow: 'redirect',
    countries: ['NL'],
    currencies: ['eur'],
  },
  giropay: {
    name: 'Giropay',
    flow: 'redirect',
    countries: ['DE'],
    currencies: ['eur'],
  },
  multibanco: {
    name: 'Multibanco',
    flow: 'receiver',
    countries: ['PT'],
    currencies: ['eur'],
  },
  p24: {
    name: 'Przelewy24',
    flow: 'redirect',
    countries: ['PL'],
    currencies: ['eur', 'pln'],
  },
  sepa_debit: {
    name: 'SEPA Direct Debit',
    flow: 'none',
    countries: [
      'FR',
      'DE',
      'ES',
      'BE',
      'NL',
      'LU',
      'IT',
      'PT',
      'AT',
      'IE',
      'FI',
    ],
    currencies: ['eur'],
  },
  sofort: {
    name: 'SOFORT',
    flow: 'redirect',
    countries: ['DE', 'AT'],
    currencies: ['eur'],
  },
  wechat: {
    name: 'WeChat',
    flow: 'none',
    countries: ['CN', 'HK', 'SG', 'JP'],
    currencies: ['aud', 'cad', 'eur', 'gbp', 'hkd', 'jpy', 'nzd', 'sgd', 'usd'],
  },
  au_becs_debit: {
    name: 'BECS Direct Debit',
    flow: 'none',
    countries: ['AU'],
    currencies: ['aud'],
  },
};
const PRODUCTS = [
  {
    id: 'pins',
    object: 'product',
    active: true,
    attributes: ['set'],
    caption: null,
    created: 1513848330,
    deactivate_on: [],
    description: null,
    images: [],
    livemode: false,
    metadata: {},
    name: 'Stripe Pins',
    package_dimensions: null,
    shippable: true,
    skus: {
      object: 'list',
      data: [
        {
          id: 'pins-collector',
          object: 'sku',
          active: true,
          attributes: {
            set: 'Collector Set',
          },
          created: 1513848331,
          currency: USING_CURRENCY,
          image: null,
          inventory: {
            quantity: 500,
            type: 'finite',
            value: null,
          },
          livemode: false,
          metadata: {},
          package_dimensions: null,
          price: 799,
          product: 'pins',
          updated: 1576268151,
        },
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/skus?product=pins&active=true',
    },
    type: 'good',
    updated: 1552591126,
    url: null,
  },
  {
    id: 'shirt',
    object: 'product',
    active: true,
    attributes: ['size', 'gender'],
    caption: null,
    created: 1513848329,
    deactivate_on: [],
    description: null,
    images: [],
    livemode: false,
    metadata: {},
    name: 'Stripe Shirt',
    package_dimensions: null,
    shippable: true,
    skus: {
      object: 'list',
      data: [
        {
          id: 'shirt-small-woman',
          object: 'sku',
          active: true,
          attributes: {
            size: 'Small Standard',
            gender: 'Woman',
          },
          created: 1513848329,
          currency: USING_CURRENCY,
          image: null,
          inventory: {
            quantity: null,
            type: 'infinite',
            value: null,
          },
          livemode: false,
          metadata: {},
          package_dimensions: null,
          price: 999,
          product: 'shirt',
          updated: 1576255903,
        },
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/skus?product=shirt&active=true',
    },
    type: 'good',
    updated: 1513848329,
    url: null,
  },
  {
    id: 'increment',
    object: 'product',
    active: true,
    attributes: ['issue'],
    caption: null,
    created: 1513848327,
    deactivate_on: [],
    description: null,
    images: [],
    livemode: false,
    metadata: {},
    name: 'Increment Magazine',
    package_dimensions: null,
    shippable: true,
    skus: {
      object: 'list',
      data: [
        {
          id: 'increment-03',
          object: 'sku',
          active: true,
          attributes: {
            issue: 'Issue #3 “Development”',
          },
          created: 1513848328,
          currency: USING_CURRENCY,
          image: null,
          inventory: {
            quantity: null,
            type: 'infinite',
            value: null,
          },
          livemode: false,
          metadata: {},
          package_dimensions: null,
          price: 399,
          product: 'increment',
          updated: 1576267451,
        },
      ],
      has_more: false,
      total_count: 1,
      url: '/v1/skus?product=increment&active=true',
    },
    type: 'good',
    updated: 1553885845,
    url: null,
  },
];
