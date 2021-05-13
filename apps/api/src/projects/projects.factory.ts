import {define} from "typeorm-seeding";
import * as Faker from 'faker'
import {ProjectsEntity} from "./projects.entity";

define(ProjectsEntity, (faker: typeof Faker) => {
  const project = new ProjectsEntity();
  project.id = faker.random.uuid();
  project.title = faker.lorem.word(1);
  project.body = faker.lorem.text(4);
  project.badge = {
    title: faker.random.arrayElement(["Finished", "In Progress", "Finished"]),
    status: faker.random.arrayElement(["bg-success", "bg-danger", "bg-warning"]),
  };
  project.hero = {
    src: 'https://thiscatdoesnotexist.com/',
    alt: 'https://thispersondoesnotexist.com/image'
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
  //TODO: This is showing deprecated because our types are newer than the version coming in via typeorm-seeding
  project.progress = faker.random.number(10);
  const assigneeCount = faker.random.number(4)
  const assigneeArray = [];
  for (let i = assigneeCount; i > 0; i--) {
    assigneeArray.push(
      {
        url: 'https://thispersondoesnotexist.com/image',
        name: faker.name.findName()
      }
    )
  }
  project.assignee = assigneeArray;

  project.summary = {
    reporter: {
      url: 'https://thispersondoesnotexist.com/image',
      name: faker.name.findName()
    },
    createdDate: faker.date.past(),
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    budget: faker.random.number({min: 5000, max: 100000}),
    logged: faker.random.number({min: 10, max: 1000}) + "h",
    estimated: faker.random.number({min: 10, max: 1000}) + "h",
  }

  project.rollupData = {
    income: {
      goal: faker.random.number({min: 10000, max: 100000}),
      current: faker.random.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(["bg-primary", "bg-warning", "bg-success", "bg-info"]),
    },
    orders: {
      goal: faker.random.number({min: 10000, max: 100000}),
      current: faker.random.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(["bg-primary", "bg-warning", "bg-success", "bg-info"]),
    },
    revenue: {
      goal: faker.random.number({min: 10000, max: 100000}),
      current: faker.random.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(["bg-primary", "bg-warning", "bg-success", "bg-info"]),
    },
    activity: {
      goal: faker.random.number({min: 10000, max: 100000}),
      current: faker.random.number({min: 10000, max: 100000}),
      status: faker.random.arrayElement(["bg-primary", "bg-warning", "bg-success", "bg-info"]),
    }
  }
  return project
})
