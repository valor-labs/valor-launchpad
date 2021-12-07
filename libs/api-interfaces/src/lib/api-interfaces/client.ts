export interface ClientVo {
  user_id: string;
  avatar: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  description: string;
  timeline: TimelineVo[];
}

export interface TimelineVo {
  id: string;
  timelineId: string;
  title: string;
  time: string | Date;
  description: string;
}
