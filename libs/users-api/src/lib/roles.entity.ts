import {BaseEntity} from '@valor-launchpad/common-api';
import {UserRolesEntity} from './user-roles.entity';

export class RolesEntity extends BaseEntity {
  role: string;
  userRoles: UserRolesEntity[]
}
