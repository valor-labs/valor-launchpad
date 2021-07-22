import {BaseEntity} from '@valor-launchpad/common-api';
import {UserTagsEntity} from './user-tags.entity';

export class TagsEntity extends BaseEntity {
  name: string;
  userTags: UserTagsEntity[];
}
