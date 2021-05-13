import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {ProjectsEntity} from "./projects.entity";

@Entity()
export class CommentEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => ProjectsEntity, (project) => project.comments)
  @JoinColumn({name: 'parent_id'})
  project: ProjectsEntity;

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

  @Column({type: 'json', nullable: true})
  children?: Array<string>

}
