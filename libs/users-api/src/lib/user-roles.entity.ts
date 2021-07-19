import {Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';

@Entity()
export class UserRolesEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type)=> UserEntity, (user)=> user.userRoles)
  @JoinColumn({name:'user_id'})
  user: UserEntity;

  @Column()
  role:string;

  @DeleteDateColumn()
  deletedDate?: Date;
}
