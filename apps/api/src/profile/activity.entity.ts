import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, TreeParent, Tree, TreeChildren
} from "typeorm";
import {ProfileEntity} from "./profile.entity";

@Entity()
@Tree("nested-set")
export class ActivityEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => ProfileEntity, (profile) => profile.activity)
  @JoinColumn({name: 'profile_id'})
  profile: ProfileEntity;

  @TreeParent()
  parent: ActivityEntity;

  @TreeChildren()
  children: ActivityEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date

  @Column()
  timestamp: Date;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({nullable: true})
  url: string;

  @Column({type: 'longtext', nullable: true})
  body: string;

  @Column({type: 'json', nullable: true})
  reactions: Array<{ [key: string]: [value: number] }>;

}
