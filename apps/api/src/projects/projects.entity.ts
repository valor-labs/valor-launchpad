import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {CommentEntity} from "./comment.entity";

@Entity()
export class ProjectsEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany((type) => CommentEntity, (comment) => comment.project)
  comments: CommentEntity[]

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date

  //TODO: Add created by and updated by users

  @Column()
  title: string;

  @Column({type: 'longtext'})
  body: string;

  @Column({type: 'json', nullable:true})
  badge: {
    title: string;
    status: string;
  }

  @Column({type: 'json', nullable:true})
  hero: {
    src: string;
    alt: string;
  }

  @Column({type: 'json', nullable:true})
  actions: Array<{
    title: string;
    type: string;
  }>

  @Column({type: 'integer', nullable:true})
  progress: number;

  // TODO: This should become a collection of ids that is then connected to users
  @Column({type: 'json', nullable:true})
  assignee: Array<{
    name: string;
    url: string;
  }>

  @Column({type: 'json', nullable:true})
  summary: {
    reporter: {
      name: string;
      url: string;
    }
    createdDate: Date;
    startDate: Date;
    endDate: Date;
    budget: number;
    logged: string;
    estimated: string;
  }

  @Column({type: 'json', nullable:true})
  rollupData: {
    [key: string]: {
      current: number;
      goal: number;
      status: string;
    }
  }
}
