export class Project {
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
