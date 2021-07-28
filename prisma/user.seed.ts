import {PrismaClient} from '@prisma/client';
import {RolesEntity, UserEntity, UserEventsEntity} from '../libs/common-api/src';
import * as Faker from 'faker'
import * as bcrypt from 'bcrypt';
import {HELPERS} from '../libs/common-api/src/lib/entity/seed_helpers/data';

export class UserSeed {
  constructor(private prisma: PrismaClient) {
  }

  defaultEntity() {
    return {
      id: Faker.datatype.uuid(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      password: HELPERS.defaultPassword,
      emailVerified: true,
    }
  }

  defaultEvent(userId) {
    return {
      event: 'Create Event',
      target_user_id: userId
    }
  }

  async createUser(seedObj: Partial<UserEntity>, roles: RolesEntity[], events: UserEventsEntity[] = []) {
    const createEntity = Object.assign(this.defaultEntity(), seedObj)
    const userRoles = [];
    roles.map(role => {
      userRoles.push({role_id: role.id})
    })
    createEntity.password = await bcrypt.hash(createEntity.password, HELPERS.saltRounds)
    createEntity.userRoles = {
      createMany: {
        data: userRoles
      }
    }

    return await this.prisma.userEntity.create({
      data: createEntity as UserEntity
    })
  }
}
