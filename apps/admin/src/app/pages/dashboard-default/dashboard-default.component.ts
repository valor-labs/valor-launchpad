import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardDefaultService } from './dashboard-default.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { VLCheckBoxOption } from '../../../../../../libs/ui/src/lib/checkbox-group/checkbox-group.component';


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
  @ViewChild('statusRef', { static: true }) statusTmpl: TemplateRef<any>;
  latestProjectsTableColumn;
  projectOptions: VLCheckBoxOption[];
  projectControl = new FormControl();

  constructor(
    private dashboardDefaultService: DashboardDefaultService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this._fetchData();
    this._initProjectsTableColumn();
  }

  private _initProjectsTableColumn(): void {
    this.latestProjectsTableColumn = [
      { name: 'Name', prop: 'name' },
      { name: 'Start Date', prop: 'startDate', pipe: new DatePipe('en-US') },
      { name: 'End Date', prop: 'endDate', pipe: new DatePipe('en-US') },
      { name: 'Status', prop: 'status', cellTemplate: this.statusTmpl },
      { name: 'Assignee', prop: 'assignee' }
    ];
  }

  private _fetchData(): void {
    this.dashboardDefaultService.getData().subscribe((data: any) => {
      this.dashboardData = data.dashboardData;
      this.salesRevenueChartData = data.salesRevenueChartData;
      this.weeklySalesChartData = data.weeklySalesChartData;
      this.weeklySalesTableData = data.weeklySalesTableData;
      this.appointmentsData = data.appointmentsData;
      this.latestProjectsTableData = data.latestProjectsTableData;
      this._initProjectOptions();
    });
  }

  private _initProjectOptions(): void {
    this.projectOptions = this.latestProjectsTableData.map(item => ({
      label: item.name,
      value: item.name
    }));
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

  onUpdateData(): void {
    this._fetchData();
  }

  onChangeFilter(selectedItem): void {
    console.log('selectedItem', selectedItem);
  }

  onCalendarChange(value: Date[]): void {
    console.log('value', value);
  }

}
