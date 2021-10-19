import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DashboardDefaultService } from './dashboard-default.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import {
  DashboardDefaultOverviewVo,
  DashboardDefaultAppointmentVo,
  DashboardDefaultProjectVo,
  DashboardDefaultRevenueVo,
} from '@valor-launchpad/api-interfaces';
import { UserEntity } from '@valor-launchpad/common-api';
import { Action, STATUS_MAPPING } from '@valor-launchpad/api-interfaces';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ISocialActivity } from '../dashboard-social/dashboard-social.model';
import { DashboardSocialService } from '../dashboard-social/dashboard-social.service';
import {
  finalize,
  map,
  mergeMap,
  scan,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import {
  rangeSwitcher,
  TimeRange,
} from '../dashboard-analytics/dashboard-analytics.component';
import { TableColumn } from '@swimlane/ngx-datatable';

class DateOnlyPipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'MM/dd/y');
  }
}

@Component({
  selector: 'valor-launchpad-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss'],
})
export class DashboardDefaultComponent implements OnInit {
  STATUS_MAPPING = STATUS_MAPPING;
  dateRange$ = new BehaviorSubject<TimeRange>(TimeRange.TODAY);
  refreshController$ = new Subject();
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

  overview$: Observable<DashboardDefaultOverviewVo>;
  monthlyRevenue$: Observable<
    {
      name: string;
      series: { name: string; value: number }[];
    }[]
  >;
  salesRevenue$: Observable<DashboardDefaultRevenueVo[]>;
  appointments$: Observable<DashboardDefaultAppointmentVo[]>;
  latestProjects$: Observable<DashboardDefaultProjectVo[]>;
  user: UserEntity;
  salesRevenueConfig = {
    view: [700, 400],

    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: false,
    xAxisLabel: 'Month',
    showYAxisLabel: false,
    yAxisLabel: 'Sales',
    animations: true,

    colorScheme: {
      domain: ['#3F80EA', '#84aef2'],
    },
  };
  weeklySalesConfig = {
    // options
    gradient: false,
    showLegend: false,
    showLabels: false,
    isDoughnut: true,
    legendPosition: 'below',

    colorScheme: {
      domain: ['#3F80EA', '#E5A54B', '#d9534f', '#293042'],
    },
  };
  bsInlineValue = new Date();
  @ViewChild('statusRef', { static: true }) statusTmpl: TemplateRef<any>;
  latestProjectsTableColumn: TableColumn[];

  activities$: Observable<ISocialActivity>;
  loadingActivity = true;
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
  private dateRangeValue$: Observable<{ startAt: Date; endAt: Date }>;
  private activityPageLimit = 3;
  private activitiesPaginator$ = new BehaviorSubject({
    lastReadAt: undefined,
    limit: this.activityPageLimit,
  });

  constructor(
    @Inject(LOCALE_ID) private localeId: string,
    private dashboardDefaultService: DashboardDefaultService,
    private authService: AuthService,
    private toastr: ToastrService,
    private socialService: DashboardSocialService
  ) {
    this.dateRangeValue$ = combineLatest([
      this.dateRange$.asObservable().pipe(rangeSwitcher),
      this.refreshController$.asObservable().pipe(startWith(1)),
    ]).pipe(map(([first]) => first));
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.overview$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardDefaultService.getOverview(startAt, endAt)
      )
    );
    this.monthlyRevenue$ = this.dateRangeValue$.pipe(
      mergeMap(() => this.dashboardDefaultService.getMonthlyRevenue()),
      map((res) =>
        res.map((item) => ({
          name: new DatePipe(this.localeId).transform(item.month, 'LLL'),
          series: [
            { name: 'This year', value: item.thisYearRevenue },
            { name: 'Last year', value: item.lastYearRevenue },
          ],
        }))
      )
    );
    this.salesRevenue$ = this.dateRangeValue$.pipe(
      mergeMap(({ startAt, endAt }) =>
        this.dashboardDefaultService.getSalesRevenue(startAt, endAt)
      ),
      shareReplay()
    );
    this.appointments$ = this.refreshController$.asObservable().pipe(
      startWith(1),
      switchMap(() => this.dashboardDefaultService.getAppointments())
    );
    this.latestProjects$ = this.refreshController$.asObservable().pipe(
      startWith(1),
      switchMap(() => this.dashboardDefaultService.getLatestProjects())
    );
    this.latestProjectsTableColumn = [
      { name: 'Name', prop: 'title', cellClass: 'd-flex align-items-center' },
      {
        name: 'Start Date',
        prop: 'startDate',
        pipe: new DateOnlyPipe('en-US'),
        cellClass: 'd-flex align-items-center',
      },
      {
        name: 'End Date',
        prop: 'endDate',
        pipe: new DateOnlyPipe('en-US'),
        cellClass: 'd-flex align-items-center',
      },
      {
        name: 'Status',
        prop: 'status',
        cellTemplate: this.statusTmpl,
        cellClass: 'd-flex align-items-center',
      },
      {
        name: 'Assignee',
        prop: 'assignee',
        pipe: { transform: (val: string[]) => val.join(', ') },
        cellClass: 'd-flex align-items-center',
      },
    ];

    this.activities$ = this.activitiesPaginator$.pipe(
      mergeMap(({ lastReadAt, limit }) => {
        this.loadingActivity = true;
        return this.socialService
          .fetchActivities(lastReadAt, limit)
          .pipe(finalize(() => (this.loadingActivity = false)));
      }),
      scan((acc, crt) => ({
        ...crt,
        results: [...acc.results, ...crt.results],
      }))
    );
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

  loadMoreActivities(lastReadAt: number) {
    this.activitiesPaginator$.next({
      lastReadAt,
      limit: this.activityPageLimit,
    });
  }
}
