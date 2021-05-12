import {Project} from "./Project.class";

export class ProjectDetail extends Project {
  comments?: [
    {
      timestamp: number
      author: string;
      avatar: string;
      body: string;
      reactions: [
        {
          [key: string]: [value: number]
        }
      ],
      children?: [
        {
          timestamp: number;
          avatar:string;
          author: string;
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
    reporter: {
      name: string;
      url: string;
    }
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
