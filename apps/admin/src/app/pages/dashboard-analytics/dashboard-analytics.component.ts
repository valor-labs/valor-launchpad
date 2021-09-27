import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {DashboardAnalyticsService} from './dashboard-analytics.service';
import { ToastrService } from 'ngx-toastr';
import "jsvectormap/dist/js/jsvectormap.js"
import 'jsvectormap/dist/maps/world.js';
import { AuthService } from '../../core/auth/auth.service';
import { map } from 'rxjs/operators';

declare const jsVectorMap: any;

const worldMarkers = [
  {
    coords: [31.230391, 121.473701],
    name: "Shanghai"
  },
  {
    coords: [39.904202, 116.407394],
    name: "Beijing"
  },
  {
    coords: [28.704060, 77.102493],
    name: "Delhi"
  },
  {
    coords: [6.524379, 3.379206],
    name: "Lagos"
  },
  {
    coords: [39.343357, 117.361649],
    name: "Tianjin"
  },
  {
    coords: [24.860735, 67.001137],
    name: "Karachi"
  },
  {
    coords: [41.008240, 28.978359],
    name: "Istanbul"
  },
  {
    coords: [35.689487, 139.691711],
    name: "Tokyo"
  },
  {
    coords: [23.129110, 113.264381],
    name: "Guangzhou"
  },
  {
    coords: [19.075983, 72.877655],
    name: "Mumbai"
  },
  {
    coords: [40.7127837, -74.0059413],
    name: "New York"
  },
  {
    coords: [34.052235, -118.243683],
    name: "Los Angeles"
  },
  {
    coords: [41.878113, -87.629799],
    name: "Chicago"
  },
  {
    coords: [29.760427, -95.369804],
    name: "Houston"
  },
  {
    coords: [33.448376, -112.074036],
    name: "Phoenix"
  },
  {
    coords: [51.507351, -0.127758],
    name: "London"
  },
  {
    coords: [48.856613, 2.352222],
    name: "Paris"
  },
  {
    coords: [55.755825, 37.617298],
    name: "Moscow"
  },
  {
    coords: [40.416775, -3.703790],
    name: "Madrid"
  }
];


@Component({
  selector: 'valor-launchpad-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {
  userFirstName$ = this.authService.user.pipe(map(res => res.firstName));
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
    animations: true,

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
    legendPosition: 'below',
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
      domain: ['#3F80EA', '#E5A54B', '#d9534f', '#E8EAED']
    }
  };

  analyticsInfo;
  languagesData;
  mobileDesktopChartData;
  sourceMediumChartData;
  sourceMediumTableData;
  trafficTableData;

  private worldMap; // jsVectorMap instance

  constructor(
    private dashboardAnalyticsService: DashboardAnalyticsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.worldMap?.updateSize();
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

  ngAfterViewInit() {
    this.worldMap = new jsVectorMap({
      map: "world",
      selector: "#real-time-world",
      zoomButtons: true,
      zoomOnScroll: false,
      markers: worldMarkers,
      markerStyle:{
        initial: {
          r: 9,
          stroke: '#fff',
          strokeWidth: 7,
          stokeOpacity: .4,
          fill: '#3B82EC'
        },
        hover: {
          fill: '#3B82EC',
          stroke: '#3B82EC',
        },
      },
      regionStyle: {
        initial: {
          fill: '#e2e8ee',
        }
      }
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
