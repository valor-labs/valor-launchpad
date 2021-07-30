import {BaseEntity} from './base.entity';
import {UserEntity} from './user.entity';
import {RolesEntity} from './roles.entity';

export interface UserRolesEntity extends BaseEntity {
  user_id: string;
  userEntity: UserEntity;
  role_id: string;
  rolesEntity: RolesEntity;
}
