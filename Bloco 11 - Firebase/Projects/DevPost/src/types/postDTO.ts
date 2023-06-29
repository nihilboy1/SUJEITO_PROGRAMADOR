export type postDTO = {
  id: string,
  uid: string;
  timeStamp: number;
  content: string;
  author: string;
  avatarUrl: string | null;
  usersWhoLiked: string[]
};

export type addPostDTO = Omit<postDTO, 'id' >;

