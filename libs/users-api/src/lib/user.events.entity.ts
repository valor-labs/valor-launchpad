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

  @ManyToOne(type=> UserEntity, (user)=> user.userHistory)
  @JoinColumn({name:'user_id'})
  targetUser: UserEntity;

  @Column({nullable:true})//TODO: Eventually make this not nullable
  actingUser: string; //TODO: Eventually switch this to a proper entity

  @Column()
  event:string; //TODO: This eventually needs to be properly scoped (enum or another table)

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deletedDate?: Date;

}
