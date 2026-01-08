export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  with: string;
  lastMessage:  string;
  lastMessageTime:  Date;
  unread: number;
}