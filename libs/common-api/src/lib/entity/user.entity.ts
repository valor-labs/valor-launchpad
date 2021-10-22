import {Exclude} from "class-transformer";
import {UserTagsEntity} from './user-tags.entity';
import {UserRolesEntity} from './user-roles.entity';
import {UserEventsEntity} from './user.events.entity';
import {BaseEntity} from './base.entity';
import {MediaEntity} from './media.entity';

export interface UpdateUser extends Partial<UserEntity> {
  id: string;
}

export interface CreateUser extends Partial<UserEntity> {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export class UserEntity extends BaseEntity {
  constructor(userEntity?) {
    super()
    if (typeof userEntity !== 'undefined') {
      Object.assign(this, userEntity)
    }
  }

  id: string;
  username: string;
  email: string;
  @Exclude()
  password: string;
  firstName: string;
  lastName: string;
  passwordResetNeeded?: boolean;
  passwordResetToken?: string;
  lastPasswordUpdateDate?: Date
  emailVerified: boolean;
  emailVerifyToken?: string;
  phone: string;
  phoneVerifyToken?: string;
  userRoles?: Array<UserRolesEntity> | any; //TODO: Need a way to use create typings here
  suspended: boolean;
  lastLogin?: Date;
  createDate: Date;
  avatar?: MediaEntity | any; //TODO: Need a way to use create typings here
  profile: any;
  deletedDate?: Date;
  updateDate: Date;
  userTags?: Array<UserTagsEntity>
  userHistory?: Array<UserEventsEntity> | any  //TODO: Need a way to use create typings here
}

//
// // TODO: Figure out how to do this in prisma
// @EventSubscriber()
// export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
//   saltRounds = HELPERS.saltRounds;
//
//   constructor(connection: Connection) {
//     connection.subscribers.push(this);
//   }
//
//   listenTo() {
//     return UserEntity;
//   }
//
//   async beforeInsert(event: InsertEvent<UserEntity>) {
//     event.entity.password = await this.hashPassword(event.entity.password);
//     event.entity.emailVerified = false;
//     event.entity.emailVerifyToken = uuid();
//     event.entity.phoneVerifyToken = Math.random().toString(36).substr(2, 6);
//   }
//
//   async beforeUpdate(event: UpdateEvent<UserEntity>) {
//     // TODO: Fix this error
//     // eslint-disable-next-line no-prototype-builtins
//     if (event.entity && event.entity.hasOwnProperty('password')) {
//       event.entity.password = await this.hashPassword(event.entity.password);
//       event.entity.lastPasswordUpdateDate = new Date();
//     }
//     //TODO: need to check if this is a password update and salt the password again
//     //TODO: need to find out how to check who the user is to update "updated by " column
//     console.log(event.entity)
//   }
//
//   async hashPassword(password: string): Promise<string> {
//     //TODO: Refactor this to not be duplicate of crypt service
//     return await bcrypt.hash(password, this.saltRounds);
//   }
// }
