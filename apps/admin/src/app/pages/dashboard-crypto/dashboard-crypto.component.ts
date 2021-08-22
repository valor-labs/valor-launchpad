import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';
import type { TableColumn } from '@swimlane/ngx-datatable';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'valor-launchpad-dashboard-crypto',
  templateUrl: './dashboard-crypto.component.html',
  styleUrls: ['./dashboard-crypto.component.scss'],
})
export class DashboardCryptoComponent implements OnInit {
  @ViewChild('asd', { static: true }) asd: TemplateRef<any>;
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];

  rows = [
    { coin: 'ETH', price: '0.03863405', volume: '1379.634', change: 1.52 },
    { coin: 'XRP', price: '0.00009313', volume: '270.805', change: -3.3 },
    { coin: 'XMR', price: '0.02088992', volume: '84.034', change: 6.1 },
    { coin: 'DASH', price: '0.00009313', volume: '270.805', change: -3.17 },
    { coin: 'LTC', price: '0.00821501', volume: '80.566', change: 3.0 },
    { coin: 'STR', price: '0.00002948', volume: '58.981', change: 2.58 },
    { coin: 'DOGE', price: '0.00000061', volume: '46.849', change: -1.61 },
    { coin: 'REP', price: '0.0022351', volume: '37.038', change: 0.54 },
    { coin: 'EOS', price: '0.00069', volume: '35.04', change: -5.84 },
    { coin: 'DGB', price: '0.00000277', volume: '34.84', change: 0.36 },
    { coin: 'ZEC', price: '0.01505', volume: '32.326', change: -4.24 },
    { coin: 'BURST', price: '0.00000098', volume: '25.59', change: -15.52 },
    { coin: 'MAID', price: '0.00003724', volume: '20.556', change: -2.33 },
    { coin: 'ETC', price: '0.00132249', volume: '19.633', change: 4.19 },
    { coin: 'STRAT', price: '0.00028587', volume: '17.557', change: 4.4 },
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
  sellOrders = [
    {
      price: '0.03892501',
      eth: '32.07831558',
      btc: '1.24864875',
      sum: '1.26329659',
    },
    {
      price: '0.03893754',
      eth: '4.97546187',
      btc: '0.19373225',
      sum: '1.45702884',
    },
    {
      price: '0.03895189',
      eth: '0.00288098',
      btc: '0.00011222',
      sum: '1.45714106',
    },
    {
      price: '0.03896593',
      eth: '1.37722262',
      btc: '0.05366476',
      sum: '1.51080582',
    },
    {
      price: '0.03897932',
      eth: '7.91612747',
      btc: '0.30856527',
      sum: '1.81937109',
    },
    {
      price: '0.03897933',
      eth: '0.32745500',
      btc: '0.01276398',
      sum: '1.83213507',
    },
    {
      price: '0.03899180',
      eth: '0.00758003',
      btc: '0.00029556',
      sum: '1.83243063',
    },
    {
      price: '0.03899784',
      eth: '2.05272745',
      btc: '0.08005194',
      sum: '1.91248257',
    },
    {
      price: '0.03899998',
      eth: '2.59143162',
      btc: '0.10106578',
      sum: '2.01354835',
    },
    {
      price: '0.03899999',
      eth: '3.00000000',
      btc: '0.11699997',
      sum: '2.13054832',
    },
  ];
  buyOrders = [
    {
      price: '0.03892000',
      eth: '0.22446452',
      btc: '0.00873616',
      sum: '0.00873616',
    },
    {
      price: '0.03890500',
      eth: '66.39390000',
      btc: '2.58305468',
      sum: '2.59179084',
    },
    {
      price: '0.03890132',
      eth: '56.55334798',
      btc: '2.19999989',
      sum: '4.79179073',
    },
    {
      price: '0.03890053',
      eth: '0.08285351',
      btc: '0.00322305',
      sum: '4.79501378',
    },
    {
      price: '0.03889706',
      eth: '15.61516705',
      btc: '0.60738409',
      sum: '5.40239787',
    },
    {
      price: '0.03888117',
      eth: '12.84070897',
      btc: '0.49926179',
      sum: '5.90165966',
    },
    {
      price: '0.03885500',
      eth: '0.99800000',
      btc: '0.03877729',
      sum: '5.94043695',
    },
    {
      price: '0.03884325',
      eth: '0.20552300',
      btc: '0.00798318',
      sum: '5.94842013',
    },
    {
      price: '0.03883474',
      eth: '7.58480860',
      btc: '0.29455407',
      sum: '6.24297420',
    },
    {
      price: '0.03881616',
      eth: '0.25000000',
      btc: '0.00970404',
      sum: '6.25267824',
    },
  ];

  chartOptions = {
    chart: {
      height: 502,
      type: 'candlestick',
    },
    series: [
      {
        data: [
          {
            x: new Date(2016, 1, 1),
            y: [51.98, 56.29, 51.59, 53.85],
          },
          {
            x: new Date(2016, 2, 1),
            y: [53.66, 54.99, 51.35, 52.95],
          },
          {
            x: new Date(2016, 3, 1),
            y: [52.96, 53.78, 51.54, 52.48],
          },
          {
            x: new Date(2016, 4, 1),
            y: [52.54, 52.79, 47.88, 49.24],
          },
          {
            x: new Date(2016, 5, 1),
            y: [49.1, 52.86, 47.7, 52.78],
          },
          {
            x: new Date(2016, 6, 1),
            y: [52.83, 53.48, 50.32, 52.29],
          },
          {
            x: new Date(2016, 7, 1),
            y: [52.2, 54.48, 51.64, 52.58],
          },
          {
            x: new Date(2016, 8, 1),
            y: [52.76, 57.35, 52.15, 57.03],
          },
          {
            x: new Date(2016, 9, 1),
            y: [57.04, 58.15, 48.88, 56.19],
          },
          {
            x: new Date(2016, 10, 1),
            y: [56.09, 58.85, 55.48, 58.79],
          },
          {
            x: new Date(2016, 11, 1),
            y: [58.78, 59.65, 58.23, 59.05],
          },
          {
            x: new Date(2017, 0, 1),
            y: [59.37, 61.11, 59.35, 60.34],
          },
          {
            x: new Date(2017, 1, 1),
            y: [60.4, 60.52, 56.71, 56.93],
          },
          {
            x: new Date(2017, 2, 1),
            y: [57.02, 59.71, 56.04, 56.82],
          },
          {
            x: new Date(2017, 3, 1),
            y: [56.97, 59.62, 54.77, 59.3],
          },
          {
            x: new Date(2017, 4, 1),
            y: [59.11, 62.29, 59.1, 59.85],
          },
          {
            x: new Date(2017, 5, 1),
            y: [59.97, 60.11, 55.66, 58.42],
          },
          {
            x: new Date(2017, 6, 1),
            y: [58.34, 60.93, 56.75, 57.42],
          },
          {
            x: new Date(2017, 7, 1),
            y: [57.76, 58.08, 53.18, 54.71],
          },
          {
            x: new Date(2017, 8, 1),
            y: [54.8, 61.42, 53.58, 57.35],
          },
          {
            x: new Date(2017, 9, 1),
            y: [57.56, 63.09, 57.0, 62.99],
          },
          {
            x: new Date(2017, 10, 1),
            y: [62.89, 63.42, 59.72, 61.76],
          },
          {
            x: new Date(2017, 11, 1),
            y: [61.71, 64.15, 61.29, 63.04],
          },
          {
            x: new Date(2018, 0, 1),
            y: [59.37, 61.11, 59.35, 60.34],
          },
          {
            x: new Date(2018, 1, 1),
            y: [60.4, 60.52, 56.71, 56.93],
          },
          {
            x: new Date(2018, 2, 1),
            y: [57.02, 59.71, 56.04, 56.82],
          },
          {
            x: new Date(2018, 3, 1),
            y: [56.97, 59.62, 54.77, 59.3],
          },
          {
            x: new Date(2018, 4, 1),
            y: [59.11, 62.29, 59.1, 59.85],
          },
          {
            x: new Date(2018, 5, 1),
            y: [59.97, 60.11, 55.66, 58.42],
          },
          {
            x: new Date(2018, 6, 1),
            y: [58.34, 60.93, 56.75, 57.42],
          },
          {
            x: new Date(2018, 7, 1),
            y: [57.76, 58.08, 51.18, 54.71],
          },
          {
            x: new Date(2018, 8, 1),
            y: [54.8, 61.42, 53.18, 57.35],
          },
          {
            x: new Date(2018, 9, 1),
            y: [57.56, 62.09, 57.0, 61.99],
          },
          {
            x: new Date(2018, 10, 1),
            y: [62.89, 63.42, 59.72, 61.76],
          },
          {
            x: new Date(2018, 11, 1),
            y: [61.71, 64.15, 61.29, 63.04],
          },
        ],
      },
    ],
    stroke: {
      width: 1,
    },
    xaxis: {
      type: 'datetime',
    },
  };
  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  ngOnInit(): void {}
}
