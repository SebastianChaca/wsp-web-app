import { Pagination } from '../common/pagination';
import {
  lastMessage,
  serverMessageResponseNotPopulated,
} from '../message/message';
import { user, userFromServer } from '../session/session';

export interface friend {
  id: string;
  user: user;
  notifications: number;
  status: number;
  isRequesting: boolean;
  uid: string;
  lastMessage: lastMessage;
  isTyping?: boolean;
  statusIsApproved: boolean;
  statusIsPending: boolean;
  statusIsBlocked: boolean;
}

export interface friendFromApi {
  user: userFromServer;
  notifications: number;
  status: number;
  isRequesting: boolean;
  id: string;
  lastMessage: serverMessageResponseNotPopulated;
  isPending: boolean;
  isAccepted: boolean;
  isBlocked: boolean;
}
export interface PaginatedFriends extends Pagination {
  friends: friendFromApi[];
}
