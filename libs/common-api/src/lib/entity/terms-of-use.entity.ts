import { BaseEntity } from './base.entity';

export interface TermsOfUseAcceptanceEntity extends BaseEntity {
  termsOfUseId: string;
  userId: string;
}

export interface TermsOfUseEntity extends BaseEntity {
  title: string;
  content: string;
  createdUserId: string;
  deletedUserId?: string;
}