import {Project} from "./Project.class";
import {UserEntity} from '@valor-launchpad/common-api';

export class ProjectDetail extends Project {
  comments?: [
    {
      timestamp: number
      author: UserEntity;
      body: string;
      reactions: [
        {
          [key: string]: [value: number]
        }
      ],
      children?: [
        {
          timestamp: number;
          author: UserEntity;
          body: string;
          reactions: [
            {
              [key: string]: [value: number]
            }
          ]
        }
      ]
    }
  ]
  summary: {
    reporter: UserEntity
    createdDate: number;
    startDate: number;
    endDate: number;
    budget: number;
    logged: string;
    estimated: string;
  }
  rollupData: {
    [key: string]: {
      current: number;
      goal: number;
      status:string;
    }
  }
}
