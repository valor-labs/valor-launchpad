import { DashboardAnalyticsEntity } from '../../../../../libs/common-api/src/lib/entity/dashboard-analytics.entity';
import { define } from '@zchapple/typeorm-seeding';
import * as Faker from 'faker';

define(DashboardAnalyticsEntity, (faker: typeof Faker) => {
  const dashboardAnalytics = new DashboardAnalyticsEntity();
  dashboardAnalytics.analyticsInfo = {
    bounceData: faker.datatype.number(100),
    bounceSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 }),
    realTimeData: faker.datatype.number(100),
    realTimeSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 }),
    visitorsData: faker.datatype.number(100),
    visitorsSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 })
  };

  const languagesDatas = faker.datatype.number(10);
  const languagesDataArray = [];
  for (let i = 0; i < languagesDatas; i++) {
    languagesDataArray.push({
      language: faker.address.county(),
      users: faker.datatype.number(1000),
      percentage: faker.datatype.number(100)
    });
  }
  dashboardAnalytics.languagesData = languagesDataArray;

  dashboardAnalytics.mobileDesktopChartData = [
    {
      'name': 'January',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'February',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'March',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'April',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'May',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'June',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'July',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'August',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'September',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'October',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'November',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    },
    {
      'name': 'December',
      'series': [
        {
          'name': '2019',
          'value': faker.datatype.number(120)
        },
        {
          'name': '2020',
          'value': faker.datatype.number(120)
        }
      ]
    }
  ];

  dashboardAnalytics.sourceMediumChartData = [
    {
      'name': 'Direct',
      'value': faker.datatype.number(3000)
    },
    {
      'name': 'Affiliate',
      'value': faker.datatype.number(3000)
    },
    {
      'name': 'E-mail',
      'value': faker.datatype.number(3000)
    },
    {
      'name': 'Other',
      'value': faker.datatype.number(3000)
    }
  ];

  dashboardAnalytics.sourceMediumTableData = [{
    source: 'Direct',
    revenue: `$ ${faker.datatype.number(3000).toString()}`,
    value: `+ ${faker.datatype.number(100).toString()}%`,
    type: 'fas fa-square-full text-primary'
  }, {
    source: 'Affiliate',
    revenue: `$ ${faker.datatype.number(3000).toString()}`,
    value: `+ ${faker.datatype.number(100).toString()}%`,
    type: 'fas fa-square-full text-warning'
  }, {
    source: 'E-mail',
    revenue: `$ ${faker.datatype.number(3000).toString()}`,
    value: `+ ${faker.datatype.number(100).toString()}%`,
    type: 'fas fa-square-full text-danger'
  }, {
    source: 'Other',
    revenue: `$ ${faker.datatype.number(3000).toString()}`,
    value: `+ ${faker.datatype.number(100).toString()}%`,
    type: 'fas fa-square-full text-dark'
  }];

  const trafficTableDatas = faker.datatype.number(10);
  const trafficTableDataArray = [];
  for (let i = 0; i < trafficTableDatas; i++) {
    trafficTableDataArray.push({
      source: faker.company.companyName(),
      users: faker.datatype.number(2000),
      sessions: faker.datatype.number(2000),
      bounceRate: faker.datatype.number(100),
      duration: '00:06:25'
    });
  }
  dashboardAnalytics.trafficTableData = trafficTableDataArray;

  return dashboardAnalytics;
});
