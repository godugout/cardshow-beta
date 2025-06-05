import { UserRole, UserPermission } from './user';

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, metadata?: { name?: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  role?: UserRole;
  permissions?: UserPermission[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextProps {
  auth: AuthState;
  children: React.ReactNode;
}
