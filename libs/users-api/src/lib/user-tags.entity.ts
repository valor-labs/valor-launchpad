import {UserEntity} from './user.entity';
import {BaseEntity} from '@valor-launchpad/common-api';
import {TagsEntity} from './tags.entity';

export class UserTagsEntity extends BaseEntity {
  user_id: string
  userEntity: UserEntity;
  tag_id: string;
  tagsEntity: TagsEntity
}
