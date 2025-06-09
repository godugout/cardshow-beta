
import { BaseEntity } from './core';

// Re-export from core to maintain compatibility
export { UserRole, type UserPermission } from './core';
export type { User, UserProfile } from './core';

// Extended user profile interface
export interface UserProfile extends BaseEntity {
  email: string;
  name?: string;
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  role: string;
  permissions?: string[];
  preferences?: Record<string, any>;
  followers?: number;
  following?: number;
  cardCount?: number;
  collectionCount?: number;
  joinDate?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

/**
 * Database representation of User for Supabase mapping
 */
export interface DbUser {
  id: string;
  email: string;
  display_name?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  role?: string;
}
