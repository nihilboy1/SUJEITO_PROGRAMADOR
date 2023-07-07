export type getGroupDTO = {
  id: string;
  groupName: string;
  groupOwnerId: string;
  timeStamp: number;
  lastMessage: messageDTO;
};

export type addGroupDTO = Omit<getGroupDTO, 'id'>;

export type messageDTO = {
  content: string;
  timeStamp: number;
  type: 'user' | 'system';
};
