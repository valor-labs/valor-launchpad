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
    user: {
      firstName: string;
      lastName: string;
      profile: {
        avatar: {
          src: string;
          src_webp: string;
          alt: string;
        }
      }
    }
  }>;
  progress: number;
  createdDate: string | Date;
}

export interface ProjectDetailVo extends ProjectListItemVo {
  comments?: [
    {
      timestamp: number;
      author: any;
      body: string;
      reactions: [
        {
          [key: string]: [value: number];
        }
      ];
      children?: [
        {
          timestamp: number;
          author: any;
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
    reporter: {
      firstName: string;
      lastName: string;
      profile: {
        avatar: {
          src: string;
          src_webp: string;
          alt: string;
        }
      }
    };
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
  earnings: {
    [key: string]: string[] | number[]
  }

}
