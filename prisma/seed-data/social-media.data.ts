import { Prisma } from '@prisma/client';

export const STACIEHALL: Prisma.SocialMediaEntityCreateInput = {
  id: 'fdbacd4f-5a18-4461-b607-c1e282cbefc0',
  name: 'staciehall.co',
  icon: 'fas fa-globe fa-fw',
  baseUrl: 'https://stacihall.co',
};

export const TWITTER: Prisma.SocialMediaEntityCreateInput = {
  id: '45d94fb7-91d1-4280-bbc7-c107a3b512a6',
  name: 'Twitter',
  icon: 'fab fa-twitter fa-fw',
  baseUrl: 'https://twitter.com',
};

export const FACEBOOK: Prisma.SocialMediaEntityCreateInput = {
  id: 'a5513e46-fb70-4588-b9d1-97c72c937995',
  name: 'Facebook',
  icon: 'fab fa-facebook fa-fw',
  baseUrl: 'https://facebook.com',
};

export const INSTAGRAM: Prisma.SocialMediaEntityCreateInput = {
  id: 'd373b5f1-66e4-4d61-a687-409a364b1c66',
  name: 'Instagram',
  icon: 'fab fa-instagram fa-fw',
  baseUrl: 'https://instagram.com',
};

export const LINKEDIN: Prisma.SocialMediaEntityCreateInput = {
  id: '9baa198f-767b-4170-be54-6fbc26e5d76a',
  name: 'LinkedIn',
  icon: 'fab fa-linkedin fa-fw',
  baseUrl: 'https://linkedin.com',
};

export const SOCIAL_MEDIAS = [
  STACIEHALL,
  TWITTER,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
];
