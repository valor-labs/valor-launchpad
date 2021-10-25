import { ActivityEntity } from './activity.entity';
import { BaseEntity, MediaEntity } from '@valor-launchpad/common-api';
import { ProfileEmployerEntity } from './profileEmployer.entity';
import { SocialMediaMatchingEntity } from './socialMediaMatching.entity';
import { ProfileSkillsEntity } from './profileSkills.entity';

export class ProfileEntity extends BaseEntity {
  //TODO: Add created by and updated by users
  name: string;
  avatar: MediaEntity;
  username: string;
  title: string;
  following: boolean;
  location: string;
  from: string;
  employers?: ProfileEmployerEntity[];
  activity: ActivityEntity[];
  socialMedia: SocialMediaMatchingEntity[];
  skills: ProfileSkillsEntity[];
}
