import { Factory, Seeder } from '@zchapple/typeorm-seeding';
import { DashboardEntity } from '../../../../../libs/common-api/src/lib/entity/dashboard.entity';
import { Connection } from 'typeorm';


export default class CreateDashboard implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(DashboardEntity)().createMany(1);
  }
}
