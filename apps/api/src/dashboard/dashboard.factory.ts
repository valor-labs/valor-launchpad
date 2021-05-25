import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { DashboardEntity } from './dashboard.entity';

define(DashboardEntity, (faker: typeof Faker) => {
  const dashboard = new DashboardEntity();
  dashboard.dashboardData.totalEarning = faker.random.float().toString();
  dashboard.dashboardData.totalEarningSinceLastWeek = faker.random.float({ min: 0, max: 10, precision: 2 }).toString();
  dashboard.dashboardData.pendingOrders = faker.random.number(100).toString();
  dashboard.dashboardData.pendingOrdersSinceLastWeek = faker.random.float({ min: 0, max: 10, precision: 2 }).toString();
  dashboard.dashboardData.totalRevenue = faker.random.float().toString();
  dashboard.dashboardData.totalRevenueSinceLastWeek = faker.random.float({ min: 0, max: 10, precision: 2 }).toString();

  dashboard.salesRevenueChartData = [
    {
      'name': 'January',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'February',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'March',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'April',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'May',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'June',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'July',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'August',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'September',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'October',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'November',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    },
    {
      'name': 'December',
      'series': [
        {
          'name': '2019',
          'value': faker.random.number(120)
        },
        {
          'name': '2020',
          'value': faker.random.number(120)
        }
      ]
    }
  ];

  dashboard.weeklySalesChartData = [
    {
      'name': 'Direct',
      'value': faker.random.number(3000)
    },
    {
      'name': 'Affiliate',
      'value': faker.random.number(3000)
    },
    {
      'name': 'E-mail',
      'value': faker.random.number(3000)
    },
    {
      'name': 'Other',
      'value': faker.random.number(3000)
    }
  ];

  dashboard.weeklySalesTableData = [{
    source: 'Direct',
    revenue: `$ ${faker.random.number(3000).toString()}`,
    value: `+ ${faker.random.number(100).toString()}%`,
    type: 'fas fa-square-full text-primary'
  }, {
    source: 'Affiliate',
    revenue: `$ ${faker.random.number(3000).toString()}`,
    value: `+ ${faker.random.number(100).toString()}%`,
    type: 'fas fa-square-full text-warning'
  }, {
    source: 'E-mail',
    revenue: `$ ${faker.random.number(3000).toString()}`,
    value: `+ ${faker.random.number(100).toString()}%`,
    type: 'fas fa-square-full text-danger'
  }, {
    source: 'Other',
    revenue: `$ ${faker.random.number(3000).toString()}`,
    value: `+ ${faker.random.number(100).toString()}%`,
    type: 'fas fa-square-full text-dark'
  }];

  const appointments = faker.random.number(4);
  const appointmentsArray = [];
  for (let i = 0; i < appointments; i++) {
    appointmentsArray.push({
      title: faker.lorem.word(1),
      timeElapse: `${faker.random.number(60)}m ago`,
      content: faker.lorem.word(4),
    })
  }
  dashboard.appointmentsData = appointmentsArray;

  const latestProjects = faker.random.number(4);
  const latestProjectsArray = [];
  for (let i = 0; i < latestProjects; i++) {
    latestProjectsArray.push({
      name: faker.system.fileName(),
      startDate: faker.date.past(),
      endDate: faker.date.past(),
      status: faker.random.arrayElement(["Done", "Cancelled", "In progress"]),
      badgeType: faker.random.arrayElement(["badge bg-success", "badge bg-danger", "badge bg-warning"]),
      assignee: faker.name.findName()
    })
  }
  dashboard.latestProjectsTableData = latestProjectsArray;


  return dashboard;
});
