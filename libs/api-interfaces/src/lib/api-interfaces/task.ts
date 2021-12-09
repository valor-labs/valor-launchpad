export enum TaskType {
  UPCOMING = "UPCOMING",
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class TaskEntity {
  id: string;
  title?: string;
  desc: string;
  taskIndex: number;
  taskStatus: keyof typeof TaskType;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profile: {
      avatar: {
        src: string;
        src_webp: string;
        alt: string;
      };
    }
  }
}
