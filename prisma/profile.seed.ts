import * as Faker from 'faker'
import {HELPERS} from '../libs/common-api/src/lib/entity/seed_helpers/data';
import {PrismaClient} from '@prisma/client';
import {ProfileEntity} from '../apps/api/src/profile/profile.entity';

export class ProfileSeed {
  constructor(private prisma: PrismaClient) {
  }

  defaultEntity() {
    const username = Faker.internet.userName();
    const firstName = Faker.name.firstName();
    const lastName = Faker.name.lastName();

    return {
      username: username,
      name: firstName + " " + lastName,
      avatar: {
        create: {
          type: 'image/jpg',
          src: Faker.random.arrayElement(HELPERS.profileImages),
          alt: `${username} profile picture`
        }
      },
      from: Faker.address.city(),
      title: Faker.random.word(),
      following: Faker.datatype.boolean(),
      location: Faker.address.city()
    }
  }

  async createProfile(seedObj) {
    const createEntity = Object.assign(this.defaultEntity(), seedObj);
    return await this.prisma.profileEntity.upsert({
      where: {username: seedObj.username},
      update: {},
      create: createEntity as ProfileEntity
    })
  }
}
