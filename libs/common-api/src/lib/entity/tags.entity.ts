import {UserTagsEntity} from './user-tags.entity';
import {BaseEntity} from './base.entity';

export class TagsEntity extends BaseEntity {
  name: string;
  userTags: UserTagsEntity[];
}
