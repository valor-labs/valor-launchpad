import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {RolesEntity} from './roles.entity';

define(RolesEntity, (faker: typeof Faker) => {
  const role = new RolesEntity();
  role.id = faker.datatype.uuid();
  return role;
})
