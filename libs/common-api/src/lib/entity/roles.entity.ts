import {BaseEntity} from './base.entity';
import {UserRolesEntity} from './user-roles.entity';

export interface CreateRolesEntity {
  role: string;
}

export class RolesEntity extends BaseEntity {
  role: string;
  userRoles?: UserRolesEntity[]
}
