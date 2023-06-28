export type postDTO = {
  uid: string;
  createdAt: Date;
  content: string;
  author: string;
  avatarUrl: string | null;
  likes: number;
};
