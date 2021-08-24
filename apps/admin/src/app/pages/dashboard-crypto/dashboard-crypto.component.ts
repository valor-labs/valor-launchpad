import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';
import type { TableColumn } from '@swimlane/ngx-datatable';
import {
  BuyOrder,
  DashboardCryptoService,
  MainInfo,
  MarketLine,
  SellOrder,
} from './dashboard-crypto.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'valor-launchpad-dashboard-crypto',
  templateUrl: './dashboard-crypto.component.html',
  styleUrls: ['./dashboard-crypto.component.scss'],
})
export class DashboardCryptoComponent implements OnInit {
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
  columns: TableColumn[] = [
    { name: 'Coin', prop: 'coin', cellClass: 'd-flex align-items-center' },
    {
      name: 'Price',
      prop: 'price',
      cellClass: 'd-flex align-items-center justify-content-end',
    },
    {
      name: 'Volume',
      prop: 'volume',
      cellClass: 'd-flex align-items-center justify-content-end',
    },
    {
      cellClass: ({ value }) => {
        const baseClasses = 'd-flex align-items-center justify-content-end';
        const dynamic = value >= 0 ? 'text-success' : 'text-danger';
        return `${baseClasses} ${dynamic}`;
      },
      name: 'Change',
      prop: 'change',
      pipe: {
        transform: (value: number): string =>
          value >= 0 ? `+${value.toFixed(2)}` : value.toFixed(2),
      },
    },
  ];
  sellOrderColumns: TableColumn[] = [
    {
      name: 'Price',
      prop: 'price',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'ETH',
      prop: 'eth',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'BTC',
      prop: 'btc',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'Sum(BTC)',
      prop: 'sum',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
  ];
  buyOrderColumns: TableColumn[] = [
    {
      name: 'Price',
      prop: 'price',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'ETH',
      prop: 'eth',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'BTC',
      prop: 'btc',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
    {
      name: 'Sum(BTC)',
      prop: 'sum',
      cellClass: 'd-flex align-items-center justify-content-end',
      sortable: false,
    },
  ];
  mainInfos$: Observable<MainInfo[]>;
  markets$: Observable<MarketLine[]>;
  sellOrders$: Observable<SellOrder[]>;
  buyOrders$: Observable<BuyOrder[]>;
  chartOptions$: Observable<{ chart; series; stroke; xaxis }>;
  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private dashboardCryptoService: DashboardCryptoService
  ) {}

  ngOnInit(): void {
    this.mainInfos$ = this.dashboardCryptoService.getMainInfos();
    this.markets$ = this.dashboardCryptoService.getMarkets();
    this.sellOrders$ = this.dashboardCryptoService.getSellOrders();
    this.buyOrders$ = this.dashboardCryptoService.getBuyOrders();
    this.chartOptions$ = this.dashboardCryptoService.getKLine().pipe(
      map((rows) => ({
        chart: {
          height: 502,
          type: 'candlestick',
        },
        series: [
          {
            data: rows.map((line) => ({ x: line.date, y: line.value })),
          },
        ],
        stroke: {
          width: 1,
        },
        xaxis: {
          type: 'datetime',
        },
      }))
    );
  }
}
