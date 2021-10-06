import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { DatePipe, PercentPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeMap, shareReplay, startWith } from 'rxjs/operators';
import { ApexChart } from 'ng-apexcharts';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import * as dayjs from 'dayjs';
import 'jsvectormap/dist/js/jsvectormap.js';
import 'jsvectormap/dist/maps/world.js';

import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { Action } from '@valor-launchpad/api-interfaces';
import {
  DashboardAnalyticByCityVo,
  DashboardAnalyticByLanguageVo,
  DashboardAnalyticBySourceVo,
  DashboardAnalyticOverviewVo,
  DashboardAnalyticTrafficVo,
} from '@valor-launchpad/common-api';
import { AuthService } from '../../core/auth/auth.service';

declare const jsVectorMap: any;

export enum TimeRange {
  TODAY = 'Today',
  THIS_WEEK = 'This week',
  THIS_MONTH = 'This month',
}

export const rangeSwitcher = map((rng: TimeRange) => {
  const now = new Date();
  switch (rng) {
    case TimeRange.TODAY:
      return {
        startAt: dayjs(now).startOf('d').toDate(),
        endAt: dayjs(now).endOf('d').toDate(),
      };
    case TimeRange.THIS_WEEK:
      return {
        startAt: dayjs(now).startOf('w').toDate(),
        endAt: dayjs(now).endOf('w').toDate(),
      };
    case TimeRange.THIS_MONTH:
      return {
        startAt: dayjs(now).startOf('M').toDate(),
        endAt: dayjs(now).endOf('M').toDate(),
      };
  }
});

interface ApexChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
}

@Component({
  selector: 'valor-launchpad-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {
  timeRangeActions: Action[] = [
    {
      label: TimeRange.TODAY,
      event: () => {
        this.dateRange$.next(TimeRange.TODAY);
      },
    },
    {
      label: TimeRange.THIS_WEEK,
      event: () => {
        this.dateRange$.next(TimeRange.THIS_WEEK);
      },
    },
    {
      label: TimeRange.THIS_MONTH,
      event: () => {
        this.dateRange$.next(TimeRange.THIS_MONTH);
      },
    },
  ];
  mainInfo$: Observable<DashboardAnalyticOverviewVo>;
  byCity$: Observable<DashboardAnalyticByCityVo>;
  byLanguage$: Observable<DashboardAnalyticByLanguageVo>;
  byPlatform$: Observable<
    Array<{
      name: string;
      series: { name: string; value: number }[];
    }>
  >;
  byInterest$: Observable<ApexChartOptions>;
  bySource$: Observable<DashboardAnalyticBySourceVo>;
  byTraffic$: Observable<DashboardAnalyticTrafficVo>;
  userFirstName$ = this.authService.user.pipe(map((res) => res.firstName));
  mobileDesktopConfig = {
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    animations: true,

    colorScheme: {
      domain: ['#3F80EA', '#84aef2'],
    },
  };
  sourceMediumConfig = {
    gradient: false,
    showLegend: false,
    showLabels: false,
    isDoughnut: true,
    legendPosition: 'below',
    colorScheme: {
      domain: ['#3F80EA', '#E5A54B', '#d9534f', '#E8EAED'],
    },
  };
  trafficColumns: TableColumn[] = [
    { name: 'Source', prop: 'source', cellClass: 'd-flex align-items-center' },
    {
      name: 'Users',
      prop: 'userCount',
      cellClass: 'd-flex align-items-center',
    },
    {
      name: 'Sessions',
      prop: 'sessionCount',
      cellClass: 'd-flex align-items-center',
    },
    {
      name: 'Bounce Rate',
      prop: 'bounceRate',
      cellClass: ({ row }) => {
        const basicClass = 'd-flex align-items-center';
        return row.bounceRate > 0.5
          ? `${basicClass} text-danger`
          : `${basicClass} text-success`;
      },
      pipe: new PercentPipe(this.localeId),
    },
    {
      name: 'Avg. Session Duration',
      prop: 'sessionDuration',
      cellClass: 'd-flex align-items-center justify-content-center',
      pipe: {
        transform: (seconds) => {
          return new Date(seconds * 1000).toISOString().substr(11, 8);
        },
      },
    },
  ];

  dateRange$ = new BehaviorSubject<TimeRange>(TimeRange.TODAY);
  refreshController$ = new Subject();
  private dateRangeValue$: Observable<{ startAt: Date; endAt: Date }>;
  private worldMap; // jsVectorMap instance

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private dashboardAnalyticsService: DashboardAnalyticsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.dateRangeValue$ = combineLatest([
      this.dateRange$.asObservable().pipe(rangeSwitcher),
      this.refreshController$.asObservable().pipe(startWith(1)),
    ]).pipe(map(([first]) => first));
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.worldMap?.updateSize();
  }

  ngOnInit() {
    this.mainInfo$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getOverview(startAt, endAt)
      ),
      shareReplay()
    );

    this.byCity$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getByCity(startAt, endAt)
      ),
      shareReplay()
    );

    this.byLanguage$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getByLanguage(startAt, endAt)
      ),
      shareReplay()
    );

    this.byInterest$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getByInterest(startAt, endAt)
      ),
      map((res) => {
        return {
          series: [
            {
              name: 'Percentage',
              data: res.map(({ percentage }) => percentage),
            },
          ],
          chart: {
            toolbar: { show: false },
            width: '100%',
            height: 350,
            type: 'radar',
          },
          xaxis: {
            categories: res.map(({ interest }) => interest),
          },
        } as ApexChartOptions;
      }),
      shareReplay()
    );

    this.bySource$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getBySource(startAt, endAt)
      ),
      shareReplay()
    );

    this.byTraffic$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardAnalyticsService.getByTraffic(startAt, endAt)
      ),
      shareReplay()
    );

    // static, not influenced by date range selector
    this.byPlatform$ = this.dashboardAnalyticsService.getByPlatform().pipe(
      map((data) =>
        data.map((i) => ({
          name: new DatePipe(this.localeId).transform(i.month, 'LLL'),
          series: [
            { name: 'Mobile', value: i.mobile },
            { name: 'Desktop', value: i.desktop },
          ],
        }))
      )
    );
  }

  ngAfterViewInit() {
    this.worldMap = new jsVectorMap({
      map: 'world',
      selector: '#real-time-world',
      zoomButtons: true,
      zoomOnScroll: false,
      markerStyle: {
        initial: {
          r: 9,
          stroke: '#fff',
          strokeWidth: 7,
          stokeOpacity: 0.4,
          fill: '#3B82EC',
        },
        hover: {
          fill: '#3B82EC',
          stroke: '#3B82EC',
        },
      },
      regionStyle: {
        initial: {
          fill: '#e2e8ee',
        },
      },
    });
    this.dateRangeValue$
      .pipe(
        mergeMap(({ startAt, endAt }) => {
          this.worldMap.removeMarkers();
          return this.dashboardAnalyticsService.getByCity(startAt, endAt);
        })
      )
      .subscribe((res) => {
        this.worldMap.addMarkers(
          res.map((i) => ({
            coords: [i.latitude, i.longitude],
            name: i.cityName,
          }))
        );
      });
  }
  onClickAction(): void {
    this.toastr.success('Action!', 'You Click the Action!');
  }

  onClickAnotherAction(): void {
    alert('You Click the Another Action!');
  }

  onClickSomethingElse(): void {
    console.log('You click the something else');
  }
}
