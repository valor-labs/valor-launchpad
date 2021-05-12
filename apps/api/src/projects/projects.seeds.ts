import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {ProjectsEntity} from "./projects.entity";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(ProjectsEntity)().create()
  }
}
