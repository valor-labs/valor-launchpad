import {UserEntity} from './user.entity';
import {BaseEntity} from '@valor-launchpad/common-api';
import {RolesEntity} from './roles.entity';

export class UserRolesEntity extends BaseEntity {
  user_id: string;
  userEntity: UserEntity;
  role_id: string;
  rolesEntity: RolesEntity;
}
