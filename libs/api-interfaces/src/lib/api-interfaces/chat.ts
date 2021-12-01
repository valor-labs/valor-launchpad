export interface ChatThreadVo {
  id: string;
  name: string;
  isGroup: boolean;
  avatar?: {
    src: string;
    src_webp: string;
    alt: string;
  };
  isConnected: boolean;
  targetingUser?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  chatThreadUsers: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isConnected?: boolean;
    profile: {
      avatar: {
        src: string;
        src_webp: string;
        alt: string;
      };
    };
  }[];
  unreadMessages: string[];
}

export interface ChatMessageVo {
  id: string;
  message: any;
  createdDate: string | Date;
  isSelf: boolean;
  threadId: string;
  createdUser: {
    id: string;
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
  // todo: thread type is not same when push message and returning after create message
  // ChatThreadVo
  thread?: any;
}

export interface ChatSearchVo {
  contacts: Pick<ChatThreadVo, 'id' | 'targetingUser' | 'avatar' | 'name'>[];
  groups: Pick<ChatThreadVo, 'id' | 'name' | 'chatThreadUsers' | 'isGroup'>[];
}
