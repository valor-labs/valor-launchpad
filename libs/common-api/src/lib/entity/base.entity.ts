import {UserEntity} from './user.entity';

export class BaseEntity {
  id: string;
  createdDate: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  createdBy?: UserEntity;
  deletedBy?: UserEntity;
}
