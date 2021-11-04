import { PaginationVo } from './pagination';

export interface NotificationVo {
  id: number;
  type: 'COMMENT' | 'REPLY_COMMENT' | 'LIKE_COMMENT';
  read: boolean;
  extras: any; // todo: add type restriction
  createdDate: string | Date;
}

export interface NotificationPaginatedListVo {
  data: NotificationVo[];
  page: PaginationVo;
}
