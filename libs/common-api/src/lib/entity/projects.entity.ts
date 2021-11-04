import { CommentEntity } from './comment.entity';
import {
  BaseEntity,
  MediaEntity,
  UserEntity,
} from '@valor-launchpad/common-api';

export class ProjectsEntity extends BaseEntity {
  constructor() {
    super();
  }
  //TODO: Need to find a way to track updates and "version" this entity
  comments?: CommentEntity[];
  title: string;
  body: string;
  badge?:
    | {
        title: string;
        status: string;
      }
    | any;
  hero?: MediaEntity;
  actions?:
    | Array<{
        title: string;
        type: string;
      }>
    | any;
  progress?: number;
  // TODO: This should become a collection of ids that is then connected to users
  assignee?: UserEntity[];
  projectSummary?:
    | {
        reporter:
          | {
              name: string;
              url: string;
            }
          | any;
        startDate?: Date;
        endDate?: Date;
        budget?: number;
        logged?: string;
        estimated?: string;
      }
    | any;
  rollupData?:
    | {
        [key: string]: {
          current: number;
          goal: number;
          status: string;
        };
      }
    | any;
  earnings?:
    | {
        [key: string]: string[]|number[]
      }
    | any;
}
