import {UserEntity} from './user.entity';
import {BaseEntity} from '@valor-launchpad/common-api';


export class UserEventsEntity extends BaseEntity {
  targetUser: UserEntity;
  actingUser?: UserEntity;
  event: string; //TODO: This eventually needs to be properly scoped (enum or another table)
}
