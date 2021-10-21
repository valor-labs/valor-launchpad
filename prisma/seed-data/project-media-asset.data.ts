import { Prisma } from '@prisma/client';
import { PROJECTS } from './project.data';
import { image, lorem } from 'faker';

export const PROJECT_MEDIA_ASSETS: Prisma.MediaAssetCreateManyInput[] = PROJECTS.map(
  (project) => ({
    project_id: project.id,
    type: 'image/png',
    src: image.imageUrl(undefined, undefined, undefined, true),
    alt: lorem.words(4),
  })
);
