import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

  mobileDesktopConfig = {
    multi: [
      {
        'name': 'January',
        'series': [
          {
            'name': '2019',
            'value': 100
          },
          {
            'name': '2020',
            'value': 120
          }
        ]
      },
      {
        'name': 'February',
        'series': [
          {
            'name': '2019',
            'value': 90
          },
          {
            'name': '2020',
            'value': 70
          }
        ]
      },
      {
        'name': 'March',
        'series': [
          {
            'name': '2019',
            'value': 50
          },
          {
            'name': '2020',
            'value': 140
          }
        ]
      },
      {
        'name': 'April',
        'series': [
          {
            'name': '2019',
            'value': 90
          },
          {
            'name': '2020',
            'value': 20
          }
        ]
      },
      {
        'name': 'May',
        'series': [
          {
            'name': '2019',
            'value': 40
          },
          {
            'name': '2020',
            'value': 40
          }
        ]
      },
      {
        'name': 'June',
        'series': [
          {
            'name': '2019',
            'value': 10
          },
          {
            'name': '2020',
            'value': 110
          }
        ]
      },
      {
        'name': 'July',
        'series': [
          {
            'name': '2019',
            'value': 30
          },
          {
            'name': '2020',
            'value': 60
          }
        ]
      },
      {
        'name': 'August',
        'series': [
          {
            'name': '2019',
            'value': 50
          },
          {
            'name': '2020',
            'value': 50
          }
        ]
      },
      {
        'name': 'September',
        'series': [
          {
            'name': '2019',
            'value': 60
          },
          {
            'name': '2020',
            'value': 20
          }
        ]
      },
      {
        'name': 'October',
        'series': [
          {
            'name': '2019',
            'value': 80
          },
          {
            'name': '2020',
            'value': 10
          }
        ]
      },
      {
        'name': 'November',
        'series': [
          {
            'name': '2019',
            'value': 40
          },
          {
            'name': '2020',
            'value': 5
          }
        ]
      },
      {
        'name': 'December',
        'series': [
          {
            'name': '2019',
            'value': 80
          },
          {
            'name': '2020',
            'value': 30
          }
        ]
      }
    ],
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
    single: [
      {
        "name": "Direct",
        "value": 2602
      },
      {
        "name": "Affiliate",
        "value": 1253
      },
      {
        "name": "E-mail",
        "value": 541
      },
      {
        "name": "Other",
        "value": 1465
      }
    ],
    // options
    gradient: false,
    showLegend: false,
    showLabels: false,
    isDoughnut: true,
    legendPosition: 'below',

    colorScheme: {
      domain: ['#3F80EA', '#E5A54B', '#d9534f', '#293042']
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
