import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ActivityEntity} from "./activity.entity";

@Entity()
export class ProfileEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date

  //TODO: Add created by and updated by users

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  following: boolean;

  @Column()
  location: string;

  @Column()
  from: string;

  @Column({type: 'json'})
  employer: {
    name: string;
    url: string;
  };

  @OneToMany((type) => ActivityEntity, (activity) => activity.profile)
  activity: ActivityEntity[];

  @Column({type: 'json'})
  social_media: Array<{
    type: string;
    icon: string;
    url: string;
  }>;

  @Column({type: 'json'})
  skills: Array<{
    name: string;
    description: string;
  }>;
}
