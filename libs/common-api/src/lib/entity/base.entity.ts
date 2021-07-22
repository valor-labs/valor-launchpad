import {UserEntity} from '@valor-launchpad/users-api';

export class BaseEntity {
  id: string;
  createdDate: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: UserEntity;
  deletedBy?: UserEntity;
}
