import { messageUI, serverMessageResponse } from '../message/message';
import { user } from '../session/session';

export interface friend {
  user: user;
  notifications: number;
  status: number;
  isRequesting: boolean;
  uid: string;
  lastMessage: messageUI;
  IsTyping?: boolean;
  statusIsApproved: boolean;
}

export interface friendFromApi {
  user: user;
  notifications: number;
  status: number;
  isRequesting: boolean;
  _id: string;
  lastMessage: serverMessageResponse;
}

export interface friendsAPIResponse {
  ok: boolean;
  friends: friendFromApi[];
}
