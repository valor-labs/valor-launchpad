export interface OrderItem {
  id: string;
  name: string;
  sku: {
    attributes: any;
  };
  quantity: string;
  skuPrice: number;
  lineItemPrice: number;
  lineItemRawPrice: number;
}
