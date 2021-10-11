import {BaseEntity} from './base.entity';

export class MediaEntity extends BaseEntity {
  type: string;
  src: string;
  alt: string;
  src_webp: string;
}
