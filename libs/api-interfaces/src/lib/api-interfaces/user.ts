export interface RequestingUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordResetNeeded: boolean;
  emailVerified: boolean;
  profile: {
    id: string;
    name: string;
    username: string;
    title: string;
    location: string;
    from: string;
    city: string;
    zip: string;
    language: string;
    locale: string;
    timeZone: string;
    bio: string;
    address: string;
    avatar?: {
      id: string;
      type: string;
      src: string;
      src_webp: string;
      alt: string;
    };
  };
  userRoles: Array<{
    id: string;
    role_id: string;
    user_id: string;
    rolesEntity: {
      id: string;
      role: string;
    }
  }>;
}

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
