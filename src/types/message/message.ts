import { Pagination } from '../common/pagination';
import { imageServerResponse } from '../Images/image';
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
  image?: string | ArrayBuffer | null | undefined;
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
  image?: string | ArrayBuffer | null | undefined;
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
  iconReactions?: IconReactions[];
  image?: string | ArrayBuffer | null | undefined;
  hasImage?: boolean;
}

export interface messageToServer extends message {
  isTyping?: boolean;
  responseTo?: string;
  isLoading?: boolean;
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
    image?: imageServerResponse;
  };
  iconReactions?: IconReactions[];
  image: imageServerResponse | null;
  hasImage: boolean;
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
  image?: string | ArrayBuffer | null | undefined;
}

export interface PaginatedMessages extends Pagination {
  messages: serverMessageResponse[];
}
export type IconReactions = {
  id: string;
  icon: string;
  createdAt: Date;
  user: { id: string; name: string; email: string };
};
