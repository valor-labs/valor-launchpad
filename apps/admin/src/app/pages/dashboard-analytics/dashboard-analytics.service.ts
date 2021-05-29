import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardAnalyticsService {

  constructor() {
  }

  data = {
    analyticsInfo: {
      bounceData: '2.364',
      bounceSinceLastWeek: '+3.65%',
      realTimeData: '1.856',
      realTimeSinceLastWeek: '+2.25%',
      visitorsData: '17.212',
      visitorsSinceLastWeek: '-1.25%'
    },
    languagesData: [{
      language: 'en-us',
      users: '735',
      percentage: '43%'
    }],
    mobileDesktopChartData: [
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
    sourceMediumChartData: [
      {
        'name': 'Direct',
        'value': 2602
      },
      {
        'name': 'Affiliate',
        'value': 1253
      },
      {
        'name': 'E-mail',
        'value': 541
      },
      {
        'name': 'Other',
        'value': 1465
      }
    ],
    sourceMediumTableData: [{
      source: 'Direct',
      revenue: '2602',
      value: '+43%',
      type: 'fas fa-square-full text-primary'
    }],
    trafficTableData: [{
      source: 'Google',
      users: '1023',
      sessions: '1265',
      bounceRate: '27.23%',
      duration: '00:06:25'
    }]
  };

  getData() {
    return this.data;
  }
}
