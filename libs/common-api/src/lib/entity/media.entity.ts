import {BaseEntity} from '@valor-launchpad/common-api';

export class MediaEntity extends BaseEntity {
  type: string;
  src: string;
  alt: string;
}
