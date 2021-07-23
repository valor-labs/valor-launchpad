import {CommentEntity} from "./comment.entity";
import {BaseEntity, MediaEntity} from '@valor-launchpad/common-api';
import {UserEntity} from '@valor-launchpad/users-api';

export class ProjectsEntity extends BaseEntity {
  constructor(){
    super();
  }
  //TODO: Need to find a way to track updates and "version" this entity
  comments?: CommentEntity[]
  title: string;
  body: string;
  badge?: {
    title: string;
    status: string;
  }
  hero?: MediaEntity;
  actions?: Array<{
    title: string;
    type: string;
  }>
  progress?: number;
  // TODO: This should become a collection of ids that is then connected to users
  assignee?: UserEntity[]
  projectSummary?: {
    reporter: {
      name: string;
      url: string;
    }
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    logged?: string;
    estimated?: string;
  }
  rollupData?: {
    [key: string]: {
      current: number;
      goal: number;
      status: string;
    }
  }
}
