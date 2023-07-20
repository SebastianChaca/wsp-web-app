import {
  lastMessage,
  messageUI,
  serverMessageResponse,
  serverMessageResponseNotPopulated,
} from '../message/message';
import { user } from '../session/session';

export interface friend {
  user: user;
  notifications: number;
  status: number;
  isRequesting: boolean;
  uid: string;
  lastMessage: lastMessage;
  isTyping?: boolean;
  statusIsApproved: boolean;
}

export interface friendFromApi {
  user: user;
  notifications: number;
  status: number;
  isRequesting: boolean;
  _id: string;
  lastMessage: serverMessageResponseNotPopulated;
}

export interface friendsAPIResponse {
  ok: boolean;
  friends: friendFromApi[];
}
