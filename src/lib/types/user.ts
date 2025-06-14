
import { BaseEntity, UserRole } from './core';

export interface UserProfile extends BaseEntity {
  email: string;
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  preferences?: Record<string, any>;
}

// Re-export for backward compatibility
export type { UserRole } from './core';
