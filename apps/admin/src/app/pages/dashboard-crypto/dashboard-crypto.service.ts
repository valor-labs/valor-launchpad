import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { map } from 'rxjs/operators';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface MainInfo {
  id?: number;
  title: string;
  price: string;
  priceByUS: number;
  volume: number;
  change: number;
}

export interface MarketLine {
  id?: number;
  coin: string;
  price: string;
  volume: string;
  change: number;
}

export interface Order {
  id?: number;
  type: OrderType;
  price: string;
  eth: string;
  btc: string;
  sum: string;
}

export interface SellOrder {
  id?: number;
  price: string;
  eth: string;
  btc: string;
  sum: string;
}

export interface BuyOrder {
  id?: number;
  price: string;
  eth: string;
  btc: string;
  sum: string;
}

export interface KLine {
  id?: number;
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardCryptoService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  getMainInfos(): Observable<MainInfo[]> {
    return this.http
      .get<{ data: MainInfo[]; success: boolean }>(
        `${this.apiBase}api/dashboard-crypto/v1/crypto-main-info`
      )
      .pipe(
        map(({ data, success }) => {
          if (success) {
            return data;
          } else {
            return [];
          }
        })
      );
  }

  getMarkets(): Observable<MarketLine[]> {
    return this.http
      .get<{ data: MarketLine[]; success: boolean }>(
        `${this.apiBase}api/dashboard-crypto/v1/crypto-markets`
      )
      .pipe(
        map(({ data, success }) => {
          if (success) {
            return data;
          } else {
            return [];
          }
        })
      );
  }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<{ data: Order[]; success: boolean }>(
        `${this.apiBase}api/dashboard-crypto/v1/crypto-orders`
      )
      .pipe(
        map(({ data, success }) => {
          if (success) {
            return data;
          } else {
            return [];
          }
        })
      );
  }

  getKLine() {
    return this.http
      .get<{ data: KLine[]; success: boolean }>(
        `${this.apiBase}api/dashboard-crypto/v1/crypto-k-lines`
      )
      .pipe(
        map(({ data, success }) => {
          if (success) {
            return data.map((market) => {
              const { date, open, close, high, low, ...other } = market;

              return {
                ...other,
                date: new Date(date),
                value: [open, high, low, close],
              };
            });
          } else {
            return [];
          }
        })
      );
  }
}
