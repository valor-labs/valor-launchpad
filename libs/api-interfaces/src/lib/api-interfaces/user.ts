export interface ChatUserVo {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profile: {
    avatar: {
      src: string;
      src_webp: string;
      alt: string;
    };
  };
}
