import { Component, OnInit } from '@angular/core';
import { DashboardDefaultService } from './dashboard-default.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss']
})
export class DashboardDefaultComponent implements OnInit {

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
    animations: false,

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
  latestProjectsTableColumn = [
    {name: 'Name', prop: 'name'},
    {name: 'Start Date', prop: 'startDate'},
    {name: 'End Date', prop: 'endDate'},
    {name: 'Status', prop: 'status'},
    {name: 'Assignee', prop: 'assignee'},
  ]

  constructor(
    private dashboardDefaultService: DashboardDefaultService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.dashboardDefaultService.getData().subscribe((data: any) => {
      this.dashboardData = data.dashboardData;
      this.salesRevenueChartData = data.salesRevenueChartData;
      this.weeklySalesChartData = data.weeklySalesChartData;
      this.weeklySalesTableData = data.weeklySalesTableData;
      this.appointmentsData = data.appointmentsData;
      this.latestProjectsTableData = data.latestProjectsTableData;
    })
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
