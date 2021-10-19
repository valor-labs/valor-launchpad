import {ActivityEntity} from "./activity.entity";
import { BaseEntity, MediaEntity, UserEntity } from '@valor-launchpad/common-api';
import {ProfileEmployerEntity} from './profileEmployer.entity';
import {SocialMediaMatchingEntity} from './socialMediaMatching.entity';
import {ProfileSkillsEntity} from './profileSkills.entity';

export class Profile extends BaseEntity {
  //TODO: Add created by and updated by users
  name: string;
  avatar: MediaEntity;
  username: string;
  user: UserEntity;
  city?: string;
  zip?: string;
  language?: string;
  locale?: string;
  timeZone?: string;
  title: string;
  following: boolean;
  location: string;
  from: string;
  bio?: string;
  address?: string;
  employers?: ProfileEmployerEntity[];
  activity: ActivityEntity[];
  socialMedia: SocialMediaMatchingEntity[];
  skills: ProfileSkillsEntity[];
}
