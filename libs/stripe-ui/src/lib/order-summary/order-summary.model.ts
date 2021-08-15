export interface OrderItem {
  id: string;
  name: string;
  sku: {
    attributes: any;
  };
  quantity: number;
  skuPrice: string;
  unitAmount: number;
  lineItemPrice: string;
  lineItemRawPrice: number;
}
