import {UserEntity} from './user.entity';
import {BaseEntity} from './base.entity';


export class UserEventsEntity extends BaseEntity {
  target_user_id: string;
  targetUser: UserEntity;
  acting_user_id: string;
  actingUser?: UserEntity;
  event: string; //TODO: This eventually needs to be properly scoped (enum or another table)
}
