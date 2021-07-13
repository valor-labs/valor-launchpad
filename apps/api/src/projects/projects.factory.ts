import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {ProjectsEntity} from './projects.entity';
import {HELPERS} from '@valor-launchpad/common-api';

define(ProjectsEntity, (faker: typeof Faker) => {
  const project = new ProjectsEntity();
  project.id = faker.datatype.uuid();
  project.title = faker.lorem.words(1);
  project.body = faker.lorem.text(4);
  project.badge = {
    title: faker.random.arrayElement(['Finished', 'In Progress', 'Finished']),
    status: faker.random.arrayElement(['bg-success', 'bg-danger', 'bg-warning']),
  };
  project.hero = {
    src: faker.random.arrayElement(HELPERS.profileImages),
    alt: faker.random.arrayElement(HELPERS.profileImages)
  };
  project.actions = [
    {
      title: 'Delete',
      type: 'fas fa-trash'
    },
    {
      title: 'Clone',
      type: 'far fa-copy'
    }
  ];
  project.progress = faker.datatype.number(10);
  const assigneeCount = faker.datatype.number(4)
  const assigneeArray = [];
  for (let i = assigneeCount; i > 0; i--) {
    assigneeArray.push(
      {
        url: faker.random.arrayElement(HELPERS.profileImages),
        name: faker.name.findName()
      }
    )
  }
  project.assignee = assigneeArray;

  project.summary = {
    reporter: {
      url: faker.random.arrayElement(HELPERS.profileImages),
      name: faker.name.findName()
    },
    createdDate: faker.date.past(),
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    budget: faker.datatype.number({min: 5000, max: 100000}),
    logged: faker.datatype.number({min: 10, max: 1000}) + 'h',
    estimated: faker.datatype.number({min: 10, max: 1000}) + 'h',
  }

  project.rollupData = {
    income: {
      goal: faker.datatype.number({min: 10000, max: 100000}),
      current: faker.datatype.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
    },
    orders: {
      goal: faker.datatype.number({min: 10000, max: 100000}),
      current: faker.datatype.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
    },
    revenue: {
      goal: faker.datatype.number({min: 10000, max: 100000}),
      current: faker.datatype.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
    },
    activity: {
      goal: faker.datatype.number({min: 10000, max: 100000}),
      current: faker.datatype.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(['bg-primary', 'bg-warning', 'bg-success', 'bg-info']),
    }
  }
  return project
})
