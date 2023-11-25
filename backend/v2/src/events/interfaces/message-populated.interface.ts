export interface PopulatedMessage {
  from: User;
  to: User;
  message: string;
  seen: boolean;
  responseTo: null;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface User {
  name: string;
  email: string;
  online: boolean;
  lastActive: null;
  isActive: boolean;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  id: string;
}
