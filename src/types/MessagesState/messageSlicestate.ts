import { Pagination } from '../common/pagination';
import { messageUI } from '../message/message';

export interface MessagesState {
  messages: messageUI[];
  messagesLoading: boolean;
  error: string | null;
  pagination: Pagination;
}
