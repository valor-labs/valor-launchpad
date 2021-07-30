import {BaseEntity} from '@valor-launchpad/common-api';
import {ProfileEmployerEntity} from './profileEmployer.entity';
import {SocialMediaMatchingEntity} from './socialMediaMatching.entity';

export class EmployerEntity extends BaseEntity {
  name: string;
  url: string;
  avatar: string;
  profiles?: ProfileEmployerEntity[]
  socialMedia?: SocialMediaMatchingEntity[]
}
