import { NotificationVo } from '@valor-launchpad/api-interfaces';

export const NOTIFICATION_TYPE_MAPPING: Record<
  NotificationVo['type'],
  { title: string; icon: string }
> = {
  COMMENT: {
    title: 'Commented',
    icon: 'far fa-fw fa-comment text-primary',
  },
  REPLY_COMMENT: {
    title: 'Replied',
    icon: 'fas fa-fw fa-reply text-primary',
  },
  LIKE_COMMENT: {
    title: 'Liked',
    icon: 'fas fa-fw fa-heart text-danger',
  },
};
