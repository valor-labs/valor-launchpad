import type { Stripe } from 'stripe';

export type AllCountriesResponse = Array<{
  key: string;
  value: string;
}>;

export type PayMethodID =
  | 'card'
  | 'ach_credit_transfer'
  | 'alipay'
  | 'bancontact'
  | 'eps'
  | 'ideal'
  | 'giropay'
  | 'multibanco'
  | 'p24'
  | 'sepa_debit'
  | 'sofort'
  | 'wechat'
  | 'au_becs_debit';

export type PayMethod = {
  id: PayMethodID;
  name: string;
  flow: string;
  currencies?: string[];
};

export type MethodsByCountryResponse = PayMethod[];

export type AllProductsResponse = Array<{
  id: string;
  object: string;
  active: boolean;
  attributes: string[];
  caption?: any;
  created: number;
  deactivate_on: any[];
  description?: any;
  images: any[];
  livemode: boolean;
  metadata: any;
  name: string;
  package_dimensions?: any;
  shippable: boolean;
  skus: {
    object: string;
    data: {
      id: string;
      object: string;
      active: boolean;
      attributes: {
        set: string;
        size: string;
        gender: string;
        issue: string;
      };
      created: number;
      currency: string;
      image?: any;
      inventory: {
        quantity?: number;
        type: string;
        value?: any;
      };
      livemode: boolean;
      metadata: any;
      package_dimensions?: any;
      price: number;
      product: string;
      updated: number;
    }[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  type: string;
  updated: number;
  url?: any;
}>;

export interface PaymentIndentsInput {
  items: {
    product_name: string;
    unit_amount: number;
    currency: string;
    quantity: number;
  }[];
  pay_method: string;
}

export interface PaymentIndentsResponse {
  clientSecret: string;
  amount: number;
}

export interface PaymentSourceInput {
  type: PayMethodID; // ach_credit_transfer, multibanco
  currency: string; // usd (ACH Credit Transfer payments must be in U.S. Dollars)
  email: string; // the full email address of the customer
  amount?: number; // amount is needed for multibanco, but unnecessary for ach_credit_transfer
}

export type PaymentSourceResponse = Pick<
  Stripe.Source,
  'id' | 'ach_credit_transfer' | 'multibanco' | 'wechat'
>;

export type PaymentIntentsStatusResponse = Pick<
  Stripe.PaymentIntent,
  'status' | 'last_payment_error'
>;

export type PaymentSourceStatusResponse = Pick<
  Stripe.Source,
  | 'status'
  | 'flow'
  | 'multibanco'
  | 'ach_credit_transfer'
  | 'wechat'
  | 'amount'
  | 'currency'
>;
