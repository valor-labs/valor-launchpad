import { Prisma } from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './users';

const storyImage1 = {
  type: 'image/jpg',
  src: 'assets/img/photos/unsplash-1.jpg',
  alt: 'unsplash1 picture',
};

const storyImage2 = {
  type: 'image/jpg',
  src: 'assets/img/photos/unsplash-2.jpg',
  alt: 'unsplash2 picture',
};

const storyImage3 = {
  type: 'image/jpg',
  src: 'assets/img/photos/unsplash-3.jpg',
  alt: 'unsplash3 picture',
};

export const STORY_1: Prisma.SocialStoryCreateManyInput = {
  id: '64906c60-dbce-4906-aa99-382f7e8ef7d1',
  content:
    'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.',
  createdDate: new Date('2021-09-15T13:34:56'),
  userId: USER_1.id,
};
export const STORY_2: Prisma.SocialStoryCreateManyInput = {
  id: '0340f2a2-9ee4-4104-a67e-7651374cbfa5',
  content:
    'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
  createdDate: new Date('2021-08-15T13:34:56'),
  userId: USER_3.id,
};
export const STORY_3: Prisma.SocialStoryCreateManyInput = {
  id: '81839501-1deb-439b-91ad-1d6cf5e3ac9d',
  content: '',
  createdDate: new Date('2021-08-01T12:34:56'),
  userId: USER_2.id,
};
export const STORY_4: Prisma.SocialStoryCreateManyInput = {
  id: '405d1354-8d3c-4c83-88cb-e88156efb098',
  content:
    'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
  userId: USER_1.id,
  createdDate: new Date('2021-07-27T12:34:56'),
};

export const STORIES: Prisma.SocialStoryCreateManyInput[] = [
  STORY_1,
  STORY_2,
  STORY_3,
  STORY_4,
];

export const STORY_MEDIA_ASSETS: Prisma.MediaAssetCreateManyInput[] = [
  { story_id: STORY_1.id, ...storyImage2 },
  { story_id: STORY_1.id, ...storyImage3 },
  { story_id: STORY_3.id, ...storyImage1 },
];

export const STORY_COMMENTS: Prisma.CommentEntityCreateManyInput[] = [
  {
    storyId: STORY_1.id,
    body: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.',
    author_id: USER_2.id,
  },
  {
    storyId: STORY_3.id,
    author_id: USER_1.id,
    body: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.',
  },
];
