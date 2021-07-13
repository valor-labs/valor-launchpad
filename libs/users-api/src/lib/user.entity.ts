import {
  Column, Connection, CreateDateColumn,
  DeleteDateColumn,
  Entity, EntitySubscriberInterface, EventSubscriber,
  Index, InsertEvent, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Exclude} from "class-transformer";
import * as bcrypt from 'bcrypt';
import {HELPERS} from '@valor-launchpad/common-api';
import {v4 as uuid} from 'uuid';
import {UserTagsEntity} from './user-tags.entity';
import {UserRolesEntity} from './user-roles.entity';

@Entity()
export class UserEntity {
  constructor(userEntity?) {
    if (typeof userEntity !== 'undefined') {
      Object.assign(this, userEntity)
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({unique: true})
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  passwordResetNeeded?: boolean;

  @Column({nullable: true})
  lastPasswordUpdateDate?: Date

  @Column()
  emailVerified: boolean;

  @Column({nullable: true})
  emailVerifyToken: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  phoneVerifyToken: string;

  @OneToMany(type => UserRolesEntity, (userRole) => userRole.user, {nullable: true, cascade: true})
  userRoles?: Array<UserRolesEntity>;

  @Column({default: false})
  suspended: boolean;

  @Column({type: 'datetime', nullable: true})
  lastLogin?: Date;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deletedDate?: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(type => UserTagsEntity, (userTag) => userTag.user, {nullable: true})
  userTags?: Array<UserTagsEntity>
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  saltRounds = HELPERS.saltRounds;

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    event.entity.password = await this.hashPassword(event.entity.password);
    event.entity.emailVerified = false;
    event.entity.emailVerifyToken = uuid();
    event.entity.phoneVerifyToken = Math.random().toString(36).substr(2, 6);
  }

  beforeUpdate(event: InsertEvent<UserEntity>) {
    //TODO: need to check if this is a password update and salt the password again
    //TODO: need to find out how to check who the user is to update "updated by " column
    console.log(event.entity)
  }

  async hashPassword(password: string): Promise<string> {
    //TODO: Refactor this to not be duplicate of crypt service
    return await bcrypt.hash(password, this.saltRounds);
  }
}
