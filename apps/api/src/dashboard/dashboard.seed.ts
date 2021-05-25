import { Factory, Seeder } from 'typeorm-seeding';
import { DashboardEntity } from './dashboard.entity';
import { Connection } from 'typeorm';


export default class CreateDashboard implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(DashboardEntity)().createMany(1);
  }
}
