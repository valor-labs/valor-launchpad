import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import type { TableColumn } from '@swimlane/ngx-datatable';
import { Action } from '@valor-launchpad/api-interfaces';
import { DashboardSaasService } from './dashboard-saas.service';
import { AuthService } from '../../core/auth/auth.service';
import { map } from 'rxjs/operators';

import "jsvectormap/dist/js/jsvectormap.js"
import 'jsvectormap/dist/maps/us-aea-en.js';

declare const jsVectorMap: any;

@Component({
  selector: 'valor-launchpad-dashboard-saas',
  templateUrl: './dashboard-saas.component.html',
  styleUrls: ['./dashboard-saas.component.scss'],
})
export class DashboardSaasComponent implements OnInit, AfterViewInit {
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
  barChartConfig = {
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
      domain: ['#3F80EA', '#84aef2'],
    },
  };
  columns: TableColumn[] = [];
  mainInfo$ = this.saasService.getMainInfo();
  salesRevenue$ = this.saasService.getSalesRevenue();
  orderActivities$ = this.saasService.getOrderActivities();
  topSellingProducts$ = this.saasService.getTopSellingProducts();
  userFirstName$ = this.authService.user.pipe(map(res => res.firstName));

  private usMap; // jsVectorMap instance

  @ViewChild('techCell', { static: true })
  private techCell: TemplateRef<unknown>;

  constructor(private saasService: DashboardSaasService, private authService: AuthService) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.usMap?.updateSize();
  }

  ngOnInit(): void {
    this.initColumns();
  }

  ngAfterViewInit(): void {
    this.initUsMap();
  }

  private initUsMap() {
    this.usMap = new jsVectorMap({
      map: 'us_aea_en',
      selector: '#sales-by-state',
      zoomButtons: true,
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
      zoomOnScroll: false,
    });
    this.saasService.getSalesByState().subscribe((salesByState) => {
      this.usMap.addMarkers(
        salesByState.map((i) => ({
          coords: i.coords,
          name: `${i.city}: ${i.amount}`,
        }))
      );
    });
  }

  private initColumns() {
    this.columns = [
      { name: 'Name', sortable: true, cellClass: 'd-flex align-items-center' },
      {
        name: 'Tech',
        sortable: true,
        cellTemplate: this.techCell,
        cellClass: 'd-flex align-items-center',
      },
      {
        name: 'License',
        sortable: true,
        cellClass: 'd-flex align-items-center',
      },
      {
        name: 'Tickets',
        sortable: true,
        cellClass: 'd-flex align-items-center',
      },
      { name: 'Sales', sortable: true, cellClass: 'd-flex align-items-center' },
    ];
  }
}
