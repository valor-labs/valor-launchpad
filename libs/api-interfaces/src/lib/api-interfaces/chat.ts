export interface ChatThreadVo {
  id: string;
  name: string;
  isGroup: boolean;
  avatar: {
    src: string;
    src_webp: string;
    alt: string;
  };
  isConnected: boolean;
  targetingUser: {id: string};
  chatThreadUsers: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isConnected: boolean;
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
  message: string;
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
  }
}
