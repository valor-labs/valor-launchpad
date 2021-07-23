export interface OrderItem {
  id: string;
  name: string;
  sku: {
    attributes: any;
  };
  quantity: string;
  skuPrice: string;
  lineItemPrice: string;
  lineItemRawPrice: number;
}
