import {PrismaClient} from '@prisma/client';
import * as Faker from 'faker';

export class DashboardAnalyticsSeed {
  constructor(private prisma: PrismaClient) {
  }

  async createDashboardAnalytics() {
    const languagesDatas = Faker.datatype.number(10);
    const languagesDataArray = [];
    for (let i = 0; i < languagesDatas; i++) {
      languagesDataArray.push({
        language: Faker.address.county(),
        users: Faker.datatype.number(1000),
        percentage: Faker.datatype.number(100)
      });
    }

    const trafficTableDatas = Faker.datatype.number(10);
    const trafficTableDataArray = [];
    for (let i = 0; i < trafficTableDatas; i++) {
      trafficTableDataArray.push({
        source: Faker.company.companyName(),
        users: Faker.datatype.number(2000),
        sessions: Faker.datatype.number(2000),
        bounceRate: Faker.datatype.number(100),
        duration: '00:06:25'
      });
    }

    return await this.prisma.dashboardAnalyticsEntity.create({
      data: {
        sourceMediumTableData: [{
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
        }],
        trafficTableData: trafficTableDataArray,
        sourceMediumChartData: [
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
        mobileDesktopChartData: [
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
        ],
        languagesData: languagesDataArray,
        analyticsInfo: {
          bounceData: Faker.datatype.number(100),
          bounceSinceLastWeek: Faker.datatype.number({ min: 0, max: 10, precision: 2 }),
          realTimeData: Faker.datatype.number(100),
          realTimeSinceLastWeek: Faker.datatype.number({ min: 0, max: 10, precision: 2 }),
          visitorsData: Faker.datatype.number(100),
          visitorsSinceLastWeek: Faker.datatype.number({ min: 0, max: 10, precision: 2 })
        }
      }
    })
  }
}
