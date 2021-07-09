import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';

@Entity()
export class UserTagsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type=> UserEntity, (user)=> user.userTags)
  @JoinColumn({name:'user_id'})
  user: UserEntity;

  @Column()
  tag:string;
}
