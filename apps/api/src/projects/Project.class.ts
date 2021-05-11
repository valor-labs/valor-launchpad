export class Project {
  title: string;
  body: string;
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
  avatars: Array<{
    url: string;
  }>
}
