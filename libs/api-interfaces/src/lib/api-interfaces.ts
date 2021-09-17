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
  avatar: {src: string; alt: string};
  followed: boolean;
}
