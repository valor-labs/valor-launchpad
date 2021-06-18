export type AllCountriesResponse = Array<{
  key: string;
  value: string;
}>;

export type PayMethod =
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
export type MethodsByCountryResponse = Array<{
  id: PayMethod;
  name: string;
  flow: string;
  currencies?: string[];
}>;

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