import { userFromServer } from '../session/session';

export interface message {
  to: string | null;
  from: string | null;
  message: string | null;
}

export interface messageUI extends message {
  seen: boolean;
  date: string;
  id: string;
  parseDate?: string | null;
  nameTo?: string;
  emailTo?: string;
}

export interface messageToServer extends message {
  isTyping?: boolean;
}
export interface serverMessageResponse {
  updatedAt: string;
  createdAt: string;
  _id: string;
  seen: boolean;
  to: userFromServer;
  from: userFromServer;
  message: string | null;
}
