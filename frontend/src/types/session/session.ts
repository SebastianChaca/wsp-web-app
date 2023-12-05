export interface user {
  email: string | null;
  name: string;
  uid: string | null;
  id: string | null;
  online: boolean;
  lastActive: string;
  // roles: string;
  // createdAt: Date;
  // updatedAt: Date;
  // isAdmin: boolean;
  // isSuperAdmin: boolean;
}

export interface userFromServer {
  name: string;
  email: string;
  online: boolean;
  lastActive: string;
  isActive: boolean;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  id: string;
  token: string;
}
// export interface userFromServer {
//   email: string;
//   name: string;
//   _id: string | null;
//   online: boolean;
//   lastActive: string;
// }
export interface SessionAPIResponse {
  ok: boolean;
  token: string;
  user: userFromServer;
}
// redux
export interface sessionState extends user {
  token: string | null;
  error: string | null | undefined;
  status: 'idle' | 'loading' | 'failed';
  isLoading: boolean;
}
