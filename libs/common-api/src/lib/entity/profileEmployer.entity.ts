import { BaseEntity } from '@valor-launchpad/common-api';
import { EmployerEntity } from './employer.entity';
import { ProfileEntity } from './profile.entity';

export class ProfileEmployerEntity extends BaseEntity {
  employerId: string;
  employer: EmployerEntity;
  profileId: string;
  profile: ProfileEntity;
  current: boolean;
}
