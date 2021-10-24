import {ActivityEntity} from "./activity.entity";
import { BaseEntity, MediaEntity, UserEntity } from '@valor-launchpad/common-api';
import {EmployerEntity} from './employer.entity';
import {ProfileEmployerEntity} from './profileEmployer.entity';
import {SocialMediaMatchingEntity} from './socialMediaMatching.entity';
import {ProfileSkillsEntity} from './profileSkills.entity';

export class ProfileEntity extends BaseEntity {
  //TODO: Add created by and updated by users
  name: string;
  avatar: MediaEntity;
  username: string;
  title: string;
  user:UserEntity;
  following: boolean;
  location: string;
  from: string;
  employers?: ProfileEmployerEntity[];
  activity: ActivityEntity[];
  socialMedia: SocialMediaMatchingEntity[];
  skills: ProfileSkillsEntity[];
  city?: string;
  zip?: string;
  bio?: string;
  language?: string;
  locale?: string;
  timeZone?: string;
}
