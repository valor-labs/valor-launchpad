import { define } from '@zchapple/typeorm-seeding';
import * as Faker from 'faker';
import { DashboardEntity } from './dashboard.entity';

define(DashboardEntity, (faker: typeof Faker) => {
  const dashboard = new DashboardEntity();
  dashboard.dashboardData = {
    totalEarning: faker.datatype.number(100),
    totalEarningSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 }),
    pendingOrders: faker.datatype.number(100),
    pendingOrdersSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 }),
    totalRevenue: faker.datatype.number(100),
    totalRevenueSinceLastWeek: faker.datatype.number({ min: 0, max: 10, precision: 2 })
  };

  dashboard.salesRevenueChartData = [
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

  dashboard.weeklySalesChartData = [
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

  dashboard.weeklySalesTableData = [{
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

  const appointments = faker.datatype.number({ min: 2, max: 5 });
  const appointmentsArray = [];
  for (let i = 0; i < appointments; i++) {
    appointmentsArray.push({
      title: faker.lorem.words(1),
      timeElapse: `${faker.datatype.number(60)}m ago`,
      content: faker.lorem.words(4)
    });
  }
  dashboard.appointmentsData = appointmentsArray;

  const latestProjects = faker.datatype.number({ min: 20, max: 40 });
  const latestProjectsArray = [];
  for (let i = 0; i < latestProjects; i++) {
    latestProjectsArray.push({
      name: `Project ${faker.commerce.productName()}`,
      startDate: faker.date.past(),
      endDate: faker.date.past(),
      status: faker.random.arrayElement(['Done', 'Cancelled', 'In progress']),
      badgeType: faker.random.arrayElement(['badge bg-success', 'badge bg-danger', 'badge bg-warning']),
      assignee: faker.name.findName()
    });
  }
  dashboard.latestProjectsTableData = latestProjectsArray;


  return dashboard;
});
