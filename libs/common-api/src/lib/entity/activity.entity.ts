import { ProfileEntity } from './profile.entity';
import { BaseEntity } from '@valor-launchpad/common-api';

export class ActivityEntity extends BaseEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  profile: ProfileEntity;
  parent: ActivityEntity;
  children: ActivityEntity[];
  createdDate: Date;
  updatedDate: Date;
  timestamp: Date;
  type: string;
  name: string;
  avatar: string;
  url: string;
  body: string;
  reactions: Array<{ [key: string]: [value: number] }>;
}
