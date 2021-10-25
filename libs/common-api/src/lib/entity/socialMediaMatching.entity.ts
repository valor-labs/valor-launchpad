import { BaseEntity } from '@valor-launchpad/common-api';
import { ProfileEntity } from './profile.entity';
import { EmployerEntity } from './employer.entity';
import { SocialMediaEntity } from './socialMedia.entity';

export class SocialMediaMatchingEntity extends BaseEntity {
  profileId?: string;
  profile?: ProfileEntity;
  employerId?: string;
  employer?: EmployerEntity;
  socialMediaId: string;
  socialMedia: SocialMediaEntity;
}
