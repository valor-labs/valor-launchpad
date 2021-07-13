import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {ActivityEntity} from './activity.entity';
import {HELPERS} from '../../seed_helpers/data';

define(ActivityEntity, (faker: typeof Faker) => {
  const activity = new ActivityEntity();

  activity.createdDate = faker.date.past();
  activity.timestamp = faker.date.past();
  activity.updatedDate = faker.date.past();
  activity.type = faker.random.arrayElement(HELPERS.activityType);
  activity.name = faker.name.findName()
  activity.avatar = faker.random.arrayElement(HELPERS.profileImages);
  activity.body = faker.lorem.text(1);
  //TODO: Make children, need help here
  return activity
})
