import { Component, OnInit } from '@angular/core';
import { DashboardDefaultService } from './dashboard-default.service';

@Component({
  selector: 'valor-launchpad-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss']
})
export class DashboardDefaultComponent implements OnInit {

  dashboardData;
  salesRevenueConfig = {
    multi: null,
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
  weeklySalesConfig = {
    single: null,
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

  constructor(
    private dashboardDefaultService: DashboardDefaultService
  ) {
  }

  ngOnInit(): void {
    this.dashboardData = this.dashboardDefaultService.dashboardData;
    this.salesRevenueConfig.multi = this.dashboardDefaultService.salesRevenueData;
    this.weeklySalesConfig.single = this.dashboardDefaultService.weeklySalesData;
    this.weeklySalesTableData = this.dashboardDefaultService.weeklySalesTableData;
    this.appointmentsData = this.dashboardDefaultService.appointmentsData;
    this.latestProjectsTableData = this.dashboardDefaultService.latestProjectsTableData;
  }

}
