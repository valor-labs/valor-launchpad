import { ProjectsEntity } from './projects.entity';
import { BaseEntity } from '@valor-launchpad/common-api';

export class CommentEntity extends BaseEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  project: ProjectsEntity;
  parent: CommentEntity;
  children: CommentEntity[];
  author: string | any;
  avatar: string | any;
  body: string;
  reactions: Array<{ [key: string]: [value: number] }> | any;
}
