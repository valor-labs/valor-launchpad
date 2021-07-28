import {BaseEntity} from '@valor-launchpad/common-api';
import {ProfileSkillsEntity} from './profileSkills.entity';

export class SkillsEntity extends BaseEntity {
  name: string;
  description: string;
  profiles?: ProfileSkillsEntity[]
}
