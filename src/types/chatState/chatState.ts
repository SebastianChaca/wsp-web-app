import { Pagination } from '../common/pagination';
import { friend } from '../friend/friend';

export interface ChatState {
  friends: friend[];
  isLoading: boolean;
  error: string | null;
  friendId: string;
  friendsLoading: boolean;
  pagination: Pagination;
}
