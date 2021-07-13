import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {UserRolesEntity} from './user-roles.entity';

define(UserRolesEntity, (faker: typeof Faker) => {
  const userRole = new UserRolesEntity();
  userRole.id = faker.datatype.uuid();
  return userRole;
})
