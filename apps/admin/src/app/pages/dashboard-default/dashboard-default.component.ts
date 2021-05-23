import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.scss']
})
export class DashboardDefaultComponent implements OnInit {

  dashboardInfo = {
    totalEarning: '24.300',
    totalEarningSinceLastWeek: '+5.35%',
    pendingOrders: '43',
    pendingOrdersSinceLastWeek: '-4.25%',
    totalRevenue: '18.700',
    totalRevenueSinceLastWeek: '+8.65%'
  };

  salesRevenueConfig = {
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
  weeklySalesConfig = {
    single: [
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
  bsInlineValue = new Date();


  weeklySalesTableData;
  appointmentsData;
  latestProjectsTableData;

  constructor() {
  }

  ngOnInit(): void {
    this.weeklySalesTableData = [{
      source: 'Direct',
      revenue: '$ 2602',
      value: '+43%',
      type: 'fas fa-square-full text-primary'
    }, {
      source: 'Affiliate',
      revenue: '$ 1253',
      value: '+13%',
      type: 'fas fa-square-full text-warning'
    }, {
      source: 'E-mail',
      revenue: '$ 541',
      value: '+24%',
      type: 'fas fa-square-full text-danger'
    }, {
      source: 'Other',
      revenue: '$ 1465',
      value: '+11%',
      type: 'fas fa-square-full text-dark'
    }];

    this.appointmentsData = [{
      title: 'Chat with Carl and Ashley',
      timeElapse: '30m ago',
      content: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris...'
    }, {
      title: 'The big launch',
      timeElapse: '2h ago',
      content: 'Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc...'
    }, {
      title: 'Coffee break',
      timeElapse: '3h ago',
      content: 'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada...'
    }, {
      title: 'Chat with team',
      timeElapse: '30m ago',
      content: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum...'
    }];
    this.latestProjectsTableData = [{
      name: 'Project Apollo',
      startDate: '01/01/2018',
      endDate: '31/06/2018',
      status: 'Done',
      badgeType: 'badge bg-success',
      assignee: 'Carl Jenkins'
    }];

  }

}
