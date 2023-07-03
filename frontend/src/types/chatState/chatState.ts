import { messageUI } from '../message/message';
import { friend } from '../friend/friend';

export interface ChatState {
  messages: messageUI[];
  friends: friend[];
  isLoading: boolean;
  error: string | null;
  friendId: string;
}
