interface IComment {
  username: string;
  avatarUrl: string;
  content: string;
}

export interface IStory {
  createdDate: Date;
  mediaAsset: Array<{
    src: string;
    alt: string;
  }>;
  deletedDate: Date;
  id: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: {
      src: string;
      alt: string;
    };
  };
  content: string;
  comments: {
    author: {
      firstName: string;
      lastName: string;
      avatar: {
        src: string;
        alt: string;
      };
    };
    body: string;
  }[];
  likedByYou: boolean;
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
  results: ISocialActivityItem[];
  hasNext?: boolean;
  stopAt?: number;
}

export interface ISocialActivityItem {
  storyId: string;
  operatorAvatarSrc: string;
  createdDate: string;
  deletedDate: string;
  operatorFullName: string;
  action:
    | 'FOLLOWED'
    | 'UNFOLLOWED'
    | 'POST_STORY'
    | 'LIKED_STORY'
    | 'UNLIKED_STORY';
  targetUserId: string;
  targetUserFullName: string;
  id: number;
  targetUserAvatarSrc: string;
  operatorId: string;
}
