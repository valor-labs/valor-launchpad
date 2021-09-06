import { BaseEntity } from '@valor-launchpad/common-api';

export class MenusEntity {
  id: string;
  createdDate: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  name: string;
  route: string;
  icon: string;
  parentId: string;
  isMega: boolean;
}

export class MenusCreateEntity {
  name: string;
  key: string;
  route: string;
  icon: string;
  parentId: string;
  isMega: boolean;
}
