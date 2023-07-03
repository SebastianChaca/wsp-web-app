export interface message {
  to: string | null;
  from: string | null;
  message: string;
}

export interface messageUI extends message {
  seen: boolean;
  date: string;
  id: string;
  parseDate?: string | null;
}

export interface messageToServer extends message {
  isTyping?: boolean;
}
export interface serverMessageResponse extends message {
  updatedAt: string;
  createdAt: string;
  _id: string;
  seen: boolean;
}
