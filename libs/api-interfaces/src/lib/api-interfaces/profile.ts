export interface ProfileVo {
  id?: string;
  createdDate?: string | Date;
  updatedDate?: string | Date;
  deletedDate?: string | Date;
  name?: string;
  username?: string;
  title?: string;
  location?: string;
  from?: string;
  city?: string;
  zip?: string;
  language?: string;
  locale?: string;
  timeZone?: string;
  bio?: string;
  address?: string;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  avatar:  {
    src: string;
    alt: string;
    src_webp: string;
  };
  socialMedia?: {
    socialMediaUrl: string;
    socialMedia: {
      icon: string;
      name: string;
    }
  }[];
  skills?: { skill: {name: string} }[];
  following?: boolean;
  employers: {employer: {id: string; name: string; url: string}}[];
}
