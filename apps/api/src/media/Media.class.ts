import { BaseEntity } from '@valor-launchpad/common-api';

export class Media extends BaseEntity {
  type: string;
  src: string;
  alt: string;
  src_webp: string;
}
