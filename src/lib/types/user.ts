
export enum UserRole {
  GUEST = 'guest',
  USER = 'user', 
  CREATOR = 'creator',
  MANAGER = 'manager',
  VIEWER = 'viewer',
  MODERATOR = 'moderator',
  EDITOR = 'editor'
}

export interface User {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser extends User {
  createdAt: string;
  updatedAt: string;
}
