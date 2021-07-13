import {define} from '@zchapple/typeorm-seeding';
import * as Faker from 'faker'
import {CommentEntity} from './comment.entity';

define(CommentEntity, (faker: typeof Faker) => {
  const comment = new CommentEntity();

  comment.createdDate = faker.date.past();
  comment.updatedDate = faker.date.past();
  comment.author = faker.name.findName()
  comment.avatar = 'https://thispersondoesnotexist.com/image';
  comment.body = faker.lorem.text(1);
  //TODO: Make children, need help here
  return comment
})
