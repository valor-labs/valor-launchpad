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
    profile: {
      avatar: {
        src: string;
        src_webp: string;
        alt: string;
      };
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
  createdDate: string;
  deletedDate: string;
  operator: {
    username: string;
    firstName: string;
    lastName: string;
    profile: {
      avatar: {
        src: string;
        src_webp: string;
        alt: string;
      };
    };
  };
  targetUser: {
    username: string;
    firstName: string;
    lastName: string;
    profile: {
      avatar: {
        src: string;
        src_webp: string;
        alt: string;
      };
    };
  };
  action:
    | 'FOLLOWED'
    | 'UNFOLLOWED'
    | 'POST_STORY'
    | 'LIKED_STORY'
    | 'UNLIKED_STORY';
  targetUserId: string;
  id: number;
  operatorId: string;
  story: Pick<IStory, 'content' | 'mediaAsset'>;
}
