import {BaseEntity} from './base.entity';
import {UserRolesEntity} from './user-roles.entity';

export class RolesEntity extends BaseEntity {
  role: string;
  userRoles?: UserRolesEntity[]
}
