import type { UserEntity } from '@valor-launchpad/common-api';

export interface ProjectListItemVo {
  id: string;
  title: string;
  body: string;
  deletable: boolean;
  cloneable: boolean;
  status: string;
  hero: {
    src: string;
    src_webp: string;
    alt: string;
    type: string;
  };
  assignee: Array<{
    user: UserEntity;
  }>;
  progress: number;
  createdDate: string | Date;
}

export interface ProjectDetailVo extends ProjectListItemVo {
  comments?: [
    {
      timestamp: number;
      author: UserEntity;
      body: string;
      reactions: [
        {
          [key: string]: [value: number];
        }
      ];
      children?: [
        {
          timestamp: number;
          author: UserEntity;
          body: string;
          reactions: [
            {
              [key: string]: [value: number];
            }
          ];
        }
      ];
    }
  ];
  summary: {
    reporter: UserEntity;
    createdDate: number;
    startDate: number;
    endDate: number;
    budget: number;
    logged: string;
    estimated: string;
  };
  rollupData: {
    [key: string]: {
      current: number;
      goal: number;
      status: string;
    };
  };
}
