export interface NotificationVo {
  id: number | string;
  type: 'COMMENT' | 'REPLY_COMMENT' | 'LIKE_COMMENT';
  read: boolean;
  extras: any;  // todo: add type restriction
  createdDate: string | Date;
}
