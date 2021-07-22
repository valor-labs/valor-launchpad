import {CommentEntity} from "./comment.entity";
import {BaseEntity} from '@valor-launchpad/common-api';

export class ProjectsEntity extends BaseEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  comments: CommentEntity[]
  title: string;
  body: string;
  badge: {
    title: string;
    status: string;
  }
  hero: {
    src: string;
    alt: string;
  }
  actions: Array<{
    title: string;
    type: string;
  }>
  progress: number;
  // TODO: This should become a collection of ids that is then connected to users
  assignee: Array<{
    name: string;
    url: string;
  }>
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
  rollupData: {
    [key: string]: {
      current: number;
      goal: number;
      status: string;
    }
  }
}
