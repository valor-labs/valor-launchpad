import { Prisma } from '@prisma/client';
import { USER_1, USER_2, USER_3 } from './users';

const storyImage1 = {
  src: 'assets/img/photos/unsplash-1.jpg',
  alt: 'unsplash1 picture',
};

const storyImage2 = {
  src: 'assets/img/photos/unsplash-2.jpg',
  alt: 'unsplash2 picture',
};

const storyImage3 = {
  src: 'assets/img/photos/unsplash-3.jpg',
  alt: 'unsplash3 picture',
};

export const STORY_1: Prisma.SocialStoryCreateInput = {
  id: '64906c60-dbce-4906-aa99-382f7e8ef7d1',
  content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.',
  createdDate: new Date('2021-09-15T13:34:56'),
  mediaAsset: {
    connectOrCreate: [
      {
        create: { ...storyImage2, type: 'image/jpg' },
        where: { src_alt_unique_constraint: storyImage2 },
      },
      {
        create: { ...storyImage3, type: 'image/jpg' },
        where: { src_alt_unique_constraint: storyImage3 },
      }
    ]
  },
  user: {
    connect: { username: USER_1.username }
  },
  comments: {
    create: [{
      author: {
        connect: {username: USER_2.username}
      },
      body: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.'
    }]
  }
};
export const STORY_2: Prisma.SocialStoryCreateInput = {
  id: '0340f2a2-9ee4-4104-a67e-7651374cbfa5',
  content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
  createdDate: new Date('2021-08-15T13:34:56'),
  user: { connect: {username: USER_3.username }},
};
export const STORY_3: Prisma.SocialStoryCreateInput = {
  id: '81839501-1deb-439b-91ad-1d6cf5e3ac9d',
  content: '',
  createdDate: new Date('2021-08-01T12:34:56'),
  user: { connect: {username: USER_2.username }},
  mediaAsset: {
    connectOrCreate: [
      {
        create: { ...storyImage1, type: 'image/jpg' },
        where: { src_alt_unique_constraint: storyImage1 },
      },
    ]
  },
  comments: {
    create: [{
      author: {
        connect: {username: USER_1.username}
      },
      body: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.'
    }]
  }
};
export const STORY_4: Prisma.SocialStoryCreateInput = {
  id: '405d1354-8d3c-4c83-88cb-e88156efb098',
  content: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.',
  user: { connect: {username: USER_1.username} },
  createdDate: new Date('2021-07-27T12:34:56'),
};
export const STORIES: Prisma.SocialStoryCreateInput[] = [
  STORY_1,
  STORY_2,
  STORY_3,
  STORY_4,
];
