export interface OrderItem {
  id: string;
  name: string;
  sku: {
    attributes: any;
  };
  quantity: string;
  skuPrice: string;
  unitAmount: number;
  lineItemPrice: string;
  lineItemRawPrice: number;
}
