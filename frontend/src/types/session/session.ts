export interface user {
  email: string | null;
  name: string;
  uid: string | null;
  online: boolean;
  lastActive: string;
}

export interface userFromServer {
  email: string | null;
  name: string;
  _id: string | null;
  online: boolean;
  lastActive: string;
}
export interface SessionAPIResponse {
  ok: boolean;
  token: string;
  usuario: user;
}
// redux
export interface sessionState extends user {
  token: string | null;
  error: string | null | undefined;
  status: 'idle' | 'loading' | 'failed';
  isLoading: boolean;
}
