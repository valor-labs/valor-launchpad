import {MediaEntity} from "@valor-launchpad/common-api";

export interface Message {
  message: string;
}


export interface FAQ{
  answer:string;
  question:string;
}

export interface Message{
  id:number;
  user:{
      id:number;
      name:string;
      avatar:string;
  },
  message:string;
  time:string;
}

export interface Notification{
  id:number;
  type:'exclamation-circle'|'bell'|'home'|'user-plus',
  level:'primary'|'success'|'warning'|'danger',
  title:string;
  description:string;
  time:string;
}

export interface Menu {
  id: string;
  name: string;
  route: string;
  icon: string;
  isMega: boolean;
  children: Menu[];
}

export interface UserFollower {
  id: string;
  firstName: string;
  lastName: string;
  avatar: MediaEntity;
  followed: boolean;
}


export interface UserListLine {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  lastLogin: Date;
  deletedDate: Date;
  lastPasswordUpdateDate: Date;
  passwordResetNeeded: boolean;
  userRoles: {
    role_id: string;
    rolesEntity: {
      role: string;
    };
  }[];
  userTags: {
    tag_id: string;
    tagsEntity: {
      name: string;
    };
  }[];
  userHistory: {
    id: string;
  }[];
}
