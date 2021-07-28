import {PrismaClient} from '@prisma/client'
import * as Faker from 'faker';

export class DashboardSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createDashboard() {
    const latestProjects = Faker.datatype.number({min: 20, max: 40});
    const latestProjectsArray = [];
    for (let i = 0; i < latestProjects; i++) {
      latestProjectsArray.push({
        name: `Project ${Faker.commerce.productName()}`,
        startDate: Faker.date.past(),
        endDate: Faker.date.past(),
        status: Faker.random.arrayElement(['Done', 'Cancelled', 'In progress']),
        badgeType: Faker.random.arrayElement(['badge bg-success', 'badge bg-danger', 'badge bg-warning']),
        assignee: Faker.name.findName()
      });
    }

    const appointments = Faker.datatype.number({min: 2, max: 5});
    const appointmentsArray = [];
    for (let i = 0; i < appointments; i++) {
      appointmentsArray.push({
        title: Faker.lorem.words(1),
        timeElapse: `${Faker.datatype.number(60)}m ago`,
        content: Faker.lorem.words(4)
      });
    }

    return await this.prisma.dashboardEntity.create(
      {
        data: {
          latestProjectsTableData: latestProjectsArray,
          appointmentsData: appointmentsArray,
          dashboardData: {
            totalEarning: Faker.datatype.number(100),
            totalEarningSinceLastWeek: Faker.datatype.number({min: 0, max: 10, precision: 2}),
            pendingOrders: Faker.datatype.number(100),
            pendingOrdersSinceLastWeek: Faker.datatype.number({min: 0, max: 10, precision: 2}),
            totalRevenue: Faker.datatype.number(100),
            totalRevenueSinceLastWeek: Faker.datatype.number({min: 0, max: 10, precision: 2})
          },
          weeklySalesTableData: [
            {
              source: 'Direct',
              revenue: `$ ${Faker.datatype.number(3000).toString()}`,
              value: `+ ${Faker.datatype.number(100).toString()}%`,
              type: 'fas fa-square-full text-primary'
            }, {
              source: 'Affiliate',
              revenue: `$ ${Faker.datatype.number(3000).toString()}`,
              value: `+ ${Faker.datatype.number(100).toString()}%`,
              type: 'fas fa-square-full text-warning'
            }, {
              source: 'E-mail',
              revenue: `$ ${Faker.datatype.number(3000).toString()}`,
              value: `+ ${Faker.datatype.number(100).toString()}%`,
              type: 'fas fa-square-full text-danger'
            }, {
              source: 'Other',
              revenue: `$ ${Faker.datatype.number(3000).toString()}`,
              value: `+ ${Faker.datatype.number(100).toString()}%`,
              type: 'fas fa-square-full text-dark'
            }
          ],
          weeklySalesChartData: [
            {
              'name': 'Direct',
              'value': Faker.datatype.number(3000)
            },
            {
              'name': 'Affiliate',
              'value': Faker.datatype.number(3000)
            },
            {
              'name': 'E-mail',
              'value': Faker.datatype.number(3000)
            },
            {
              'name': 'Other',
              'value': Faker.datatype.number(3000)
            }
          ],
          salesRevenueChartData: [
            {
              'name': 'January',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'February',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'March',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'April',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'May',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'June',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'July',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'August',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'September',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'October',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'November',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            },
            {
              'name': 'December',
              'series': [
                {
                  'name': '2019',
                  'value': Faker.datatype.number(120)
                },
                {
                  'name': '2020',
                  'value': Faker.datatype.number(120)
                }
              ]
            }
          ]
        }
      }
    )
  }
}
