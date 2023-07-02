export type getPostDTO = {
  id: string;
  uid: string;
  timeStamp: number;
  content: string;
  usersWhoLiked: string[];
};

export type addPostDTO = Omit<getPostDTO, 'id'>;
