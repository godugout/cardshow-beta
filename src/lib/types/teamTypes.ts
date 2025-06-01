
import { User } from './user';

/**
 * Core team interface
 */
export interface Team {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  ownerId: string;
  owner?: User;
  createdAt: string;
  updatedAt: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags?: string[];
  members?: TeamMember[];
  website?: string;
  email?: string;
  status?: 'active' | 'inactive' | 'suspended';
  visibility?: 'public' | 'private' | 'unlisted';
  specialties?: string[];
  settings?: Record<string, any>;
  isPublic?: boolean;
}

/**
 * Team member interface
 */
export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: TeamRole;
  joinedAt: string;
  permissions?: string[];
  user?: User;
  avatarUrl?: string;
  createdAt?: string;
}

/**
 * Team roles enum
 */
export enum TeamRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member'
}

/**
 * Team invitation interface
 */
export interface TeamInvitation {
  id: string;
  teamId: string;
  invitedBy: string;
  invitedEmail: string;
  role: TeamRole;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
  expiresAt: string;
  team?: Team;
}

/**
 * Team statistics interface
 */
export interface TeamStats {
  memberCount: number;
  cardCount: number;
  collectionCount: number;
  totalViews: number;
  totalLikes: number;
  activeMembers: number;
  recentActivity: string;
}
