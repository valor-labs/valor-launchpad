import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {UserEntity} from './user.entity';

define(UserEntity, (faker: typeof Faker) => {
  const user = new UserEntity();
  user.id = faker.datatype.uuid();
  user.username = faker.internet.userName();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  return user
})
