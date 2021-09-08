import {Component, OnInit} from '@angular/core';
import {DashboardAnalyticsService} from './dashboard-analytics.service';
import {Action} from '@valor-launchpad/api-interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

  mobileDesktopConfig = {
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
    animations: false,

    colorScheme: {
      domain: ['#3F80EA', '#84aef2']
    }
  };
  interestsConfig = {
    multi: [
      {
        'name': 'Germany',
        'series': [
          {
            'name': '1990',
            'value': 62000000
          },
          {
            'name': '2010',
            'value': 73000000
          },
          {
            'name': '2011',
            'value': 89400000
          }
        ]
      },

      {
        'name': 'USA',
        'series': [
          {
            'name': '1990',
            'value': 250000000
          },
          {
            'name': '2010',
            'value': 309000000
          },
          {
            'name': '2011',
            'value': 311000000
          }
        ]
      },

      {
        'name': 'France',
        'series': [
          {
            'name': '1990',
            'value': 58000000
          },
          {
            'name': '2010',
            'value': 50000020
          },
          {
            'name': '2011',
            'value': 58000000
          }
        ]
      },
      {
        'name': 'UK',
        'series': [
          {
            'name': '1990',
            'value': 57000000
          },
          {
            'name': '2010',
            'value': 62000000
          },
          {
            'name': '2011',
            'value': 72000000
          }
        ]
      }],
    // options
    legend: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    colorScheme: {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    }
  };
  sourceMediumConfig = {
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

  analyticsInfo;
  languagesData;
  mobileDesktopChartData;
  sourceMediumChartData;
  sourceMediumTableData;
  trafficTableData;


  constructor(
    private dashboardAnalyticsService: DashboardAnalyticsService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.dashboardAnalyticsService.getData().subscribe((data: any) => {
      this.analyticsInfo = data.analyticsInfo;
      this.languagesData = data.languagesData;
      this.mobileDesktopChartData = data.mobileDesktopChartData;
      this.sourceMediumChartData = data.sourceMediumChartData;
      this.sourceMediumTableData = data.sourceMediumTableData;
      this.trafficTableData = data.trafficTableData;
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
