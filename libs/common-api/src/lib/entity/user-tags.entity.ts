import {UserEntity} from './user.entity';
import {TagsEntity} from './tags.entity';
import {BaseEntity} from './base.entity';

export class UserTagsEntity extends BaseEntity {
  user_id: string
  userEntity: UserEntity;
  tag_id: string;
  tagsEntity: TagsEntity
}
