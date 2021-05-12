export class Project {
  createdDate: number;
  updatedDate: number;
  updatedBy: string;
  createdBy: string;
  title: string;
  body: string;
  id: string;
  badge: {
    title: string;
    status: string;
  }
  hero?: {
    src: string;
    alt: string;
  };
  actions: Array<{
    title: string;
    type: string;
  }>
  progress: number;
  assignee: Array<{
    name: string;
    url: string;
  }>
}
