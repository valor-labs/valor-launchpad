export interface TermsOfUseEntity {
  id: string;
  title: string;
  content: string;
  createdUserId: string;
  deletedUserId?: string;
}
