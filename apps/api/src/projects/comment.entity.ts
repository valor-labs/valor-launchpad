import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, OneToMany
} from "typeorm";
import {ProjectsEntity} from "./projects.entity";

@Entity()
export class CommentEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => ProjectsEntity, (project) => project.comments)
  @JoinColumn({name: 'project_id'})
  project: ProjectsEntity;

  @ManyToOne(type => CommentEntity, (category: CommentEntity) => category.children)
  parent: CommentEntity;

  @OneToMany(type => CommentEntity, (category: CommentEntity) => category.parent)
  children: CommentEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date

  @Column()
  author: string;

  @Column()
  avatar: string;

  @Column({type: 'longtext'})
  body: string;

  @Column({type: 'json', nullable: true})
  reactions: Array<{ [key: string]: [value: number] }>;

}
