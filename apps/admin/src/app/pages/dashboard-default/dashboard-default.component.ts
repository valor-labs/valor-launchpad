import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardDefaultService } from './dashboard-default.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { Action } from '@valor-launchpad/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISocialActivity } from '../dashboard-social/dashboard-social.model';
import { DashboardSocialService } from '../dashboard-social/dashboard-social.service';
import { delay, finalize, mergeMap, scan } from 'rxjs/operators';

class DateOnlyPipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'MM/dd/y');
  }
}

@Component({
  selector: 'valor-launchpad-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss']
})
export class DashboardDefaultComponent implements OnInit {
  user: UserEntity;
  dashboardData;
  salesRevenueChartData;
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
      domain: ['#3F80EA', '#84aef2']
    }
  };
  weeklySalesChartData;
  weeklySalesConfig = {
    // options
    gradient: false,
    showLegend: false,
    showLabels: false,
    isDoughnut: true,
    legendPosition: 'below',

    colorScheme: {
      domain: ['#3F80EA', '#E5A54B', '#d9534f', '#293042']
    }
  };
  weeklySalesTableData;
  bsInlineValue = new Date();
  appointmentsData;
  latestProjectsTableData;
  @ViewChild('statusRef', {static: true}) statusTmpl: TemplateRef<any>;
  latestProjectsTableColumn;

  activities$: Observable<ISocialActivity>;
  loadingActivity = true;
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
  private activityPageLimit = 3;
  private activitiesPaginator$ = new BehaviorSubject({
    lastReadAt: undefined,
    limit: this.activityPageLimit,
  });

  constructor(
    private dashboardDefaultService: DashboardDefaultService,
    private authService: AuthService,
    private toastr: ToastrService,
    private socialService: DashboardSocialService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.dashboardDefaultService.getData().subscribe((data: any) => {
      this.dashboardData = data.dashboardData;
      this.salesRevenueChartData = data.salesRevenueChartData;
      this.weeklySalesChartData = data.weeklySalesChartData;
      this.weeklySalesTableData = data.weeklySalesTableData;
      this.appointmentsData = data.appointmentsData;
      this.latestProjectsTableData = data.latestProjectsTableData;
    });
    this.latestProjectsTableColumn = [
      {name: 'Name', prop: 'name'},
      {name: 'Start Date', prop: 'startDate', pipe: new DateOnlyPipe('en-US')},
      {name: 'End Date', prop: 'endDate', pipe: new DateOnlyPipe('en-US')},
      {name: 'Status', prop: 'status', cellTemplate: this.statusTmpl},
      {name: 'Assignee', prop: 'assignee'}
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
