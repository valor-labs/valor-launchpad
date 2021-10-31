export type CommentItem = {
  id: string;
  author: {
    username: string;
    firstName: string;
    lastName: string;
    avatar: {
      src: string;
      alt: string;
    };
  };
  body: string;
  children: CommentItem[];
  createdDate: Date | string;
  deletable: boolean;
  liked: boolean;
};

export type CreateComment = {
  commentId?: string;
  body: string;
};
