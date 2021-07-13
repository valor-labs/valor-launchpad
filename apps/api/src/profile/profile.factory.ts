import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {ProfileEntity} from './profile.entity';
import {HELPERS} from '../../seed_helpers/data';

define(ProfileEntity, (faker: typeof Faker) => {
  const profile = new ProfileEntity();
  profile.id = faker.datatype.uuid();
  profile.name = faker.name.findName();
  profile.avatar = faker.random.arrayElement(HELPERS.profileImages);
  profile.username = faker.internet.userName();
  profile.from = faker.address.city();
  profile.title = faker.random.word();
  profile.following = faker.random.boolean();
  profile.location = faker.address.city();
  profile.employer = {
    name:faker.name.findName(),
    url: 'https://google.com'
  }
  profile.social_media = HELPERS.social_media;
  profile.skills = HELPERS.skills;

  return profile
})
