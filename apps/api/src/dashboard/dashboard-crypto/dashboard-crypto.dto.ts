export interface CryptoOrderType {
  BUY: 'BUY';
  SELL: 'SELL'
}

export interface CryptoMainInfoDto {
  id: number;
  title: string;
  price: string;
  priceByUS: number;
  volume: number;
  change: number;
}

export interface CryptoMarketDto {
  id: number;
  coin: string;
  price: string;
  volume: string;
  change: number;
}

export interface CryptoOrderDto {
  id: number;
  type: string;
  price: string;
  eth: string;
  btc: string;
  sum: string;
}

export interface CryptoKLineDto {
  id: number;
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}