import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {UserEventsEntity} from './user.events.entity';

define(UserEventsEntity, (faker: typeof Faker) => {
  const userEvent = new UserEventsEntity();
  userEvent.id = faker.datatype.uuid();
  userEvent.createDate = faker.date.recent();
  return userEvent;
})
