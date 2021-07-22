import {BaseEntity} from '@valor-launchpad/common-api';
import {SkillsEntity} from './skills.entity';
import {ProfileEntity} from './profile.entity';

export class ProfileSkillsEntity extends BaseEntity {
  skillId: string;
  skill: SkillsEntity
  profileId: string;
  profile: ProfileEntity;
}
