import { messageUI } from '../message/message';
import { user } from '../session/session';

export interface ActiveChat extends user {
  isTyping?: boolean;
  isRequesting: boolean;
  status: number | null;
  statusIsApproved: boolean;
  responseTo?: messageUI | undefined;
}
