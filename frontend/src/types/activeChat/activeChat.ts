import { user } from '../session/session';

export interface ActiveChat extends user {
  isTyping?: boolean;
  isRequesting: boolean;
  status: number | null;
}
