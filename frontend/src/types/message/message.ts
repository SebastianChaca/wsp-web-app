import { userFromServer } from '../session/session';

export interface message {
  to: string;
  from: string;
  message: string | null;
}
export interface responseTo {
  date: string;
  id: string;
  to: string | null;
  from: string | null;
  message: string | null;
  nameTo?: string;
  emailTo?: string;
}
export interface lastMessage {
  date: string;
  id: string;
  to: string | null;
  from: string | null;
  message: string | null;
  nameTo?: string;
  emailTo?: string;
  seen: boolean;
}
export interface messageUI extends message {
  seen: boolean;
  date: string;
  id: string;
  parseDate?: string | null;
  nameTo?: string;
  emailTo?: string;
  responseTo?: responseTo;
  isLoading?: boolean;
  hasFailed?: boolean;
  temporalId?: string;
}

export interface messageToServer extends message {
  isTyping?: boolean;
  responseTo?: string;
  isLoading?: boolean;
  temporalId?: string;
}
export interface serverMessageResponse {
  updatedAt: string;
  createdAt: string;
  id: string;
  seen: boolean;
  to: userFromServer;
  from: userFromServer;
  message: string | null;
  responseTo?: {
    updatedAt: string;
    createdAt: string;
    id: string;
    seen: boolean;
    to: userFromServer;
    from: userFromServer;
    message: string | null;
  };
}

export interface serverMessageResponseNotPopulated {
  updatedAt: string;
  createdAt: string;
  _id: string;
  seen: boolean;
  to: string;
  from: string;
  message: string | null;
  responseTo?: string;
}
