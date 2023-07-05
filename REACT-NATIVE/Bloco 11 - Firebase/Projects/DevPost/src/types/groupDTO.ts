export type newGroupDTO = {
  groupName: string;
  groupOwner: string;
  timeStamp: number;
  lastMessage: messageDTO;
};

export type messageDTO = {
  content: string;
  timeStamp: number;
  type: 'user' | 'system';
};
