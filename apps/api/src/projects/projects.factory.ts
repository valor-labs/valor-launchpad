import {define} from "typeorm-seeding";
import * as Faker from 'faker'
import {ProjectsEntity} from "./projects.entity";

define(ProjectsEntity, (faker: typeof Faker) => {
  const project = new ProjectsEntity()
  project.id = faker.datatype.uuid()
  project.title  = faker.lorem.text(1)
  project.body = faker.lorem.paragraph()
  project.badge = {
    title: faker.random.arrayElement(["Finished","In Progress","Finished"]),
    status: faker.random.arrayElement(["bg-success","bg-danger","bg-warning"]),
  }
  project.hero = {
    src: faker.image.imageUrl(),
    alt: faker.image.avatar()
  }

  return project
})
