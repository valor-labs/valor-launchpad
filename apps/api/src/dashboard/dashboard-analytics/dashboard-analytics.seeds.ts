import { Factory, Seeder } from '@zchapple/typeorm-seeding';
import { Connection } from 'typeorm';
import { DashboardAnalyticsEntity } from './dashboard-analytics.entity';


export default class DashboardAnalyticsSeeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(DashboardAnalyticsEntity)().createMany(1);
  }
}
