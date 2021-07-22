import {ActivityEntity} from "./activity.entity";
import {BaseEntity} from '@valor-launchpad/common-api';
import {EmployerEntity} from './employer.entity';
import {ProfileEmployerEntity} from './profileEmployer.entity';

export class ProfileEntity extends BaseEntity {
  //TODO: Add created by and updated by users
  name: string;
  avatar: string;
  username: string;
  title: string;
  following: boolean;
  location: string;
  from: string;
  employers?: ProfileEmployerEntity[];
  activity: ActivityEntity[];
  social_media: Array<{
    type: string;
    icon: string;
    url: string;
  }>;
  skills: Array<{
    name: string;
    description: string;
  }>;
}
