import { define } from '@zchapple/typeorm-seeding';
import * as Faker from 'faker';
import { DashboardEntity } from '../../../../../libs/common-api/src/lib/entity/dashboard.entity';

define(DashboardEntity, (faker: typeof Faker) => {
  const dashboard = new DashboardEntity();


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
