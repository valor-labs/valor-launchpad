interface IComment {
  username: string;
  avatarUrl: string;
  content: string;
}

export interface IStory {
  avatarUrl: string;
  username: string;
  createdAt: Date;
  content: string;
  images: string[];
  comments: IComment[];
}

export interface ISocialUserInfo {
  avatarUrl: string;
  username: string;
  job: string;
  followed: boolean;
}

export interface ISocialUser {
  username: string;
  avatarUrl: string;
  followed: boolean;
}

export interface ISocialActivity {
  username: string;
  avatarUrl: string;
  createdAt: Date;
  action: 'startFollowing' | 'postOnTimeline' | 'postBlog';
  targetUsername?: string;
  postDetails?: {
    photos?: string[];
    content?: string;
  }
}
