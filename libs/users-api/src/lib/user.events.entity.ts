import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from './user.entity';


@Entity()
export class UserEventsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => UserEntity, (user) => user.userHistory)
  @JoinColumn({name: 'target_user_id'})
  targetUser: UserEntity;

  @ManyToOne(type => UserEntity, (user) => user.userHistory)
  @JoinColumn({name: 'acting_user_id'})
  actingUser?: UserEntity;

  @Column()
  event: string; //TODO: This eventually needs to be properly scoped (enum or another table)

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deletedDate?: Date;

}
