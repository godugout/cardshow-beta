
// Define base types used throughout the application
import { FabricSwatch } from '@/lib/types/cardTypes';

export interface Card {
  id: string;
  title: string;
  description?: string; // Make this optional to be consistent
  imageUrl: string;
  thumbnailUrl?: string;
  collectionId?: string;
  userId?: string;
  teamId?: string;
  team?: string;  // Add team field
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  tags?: string[];
  designMetadata?: any;
  reactions?: Reaction[];
  fabricSwatches?: FabricSwatch[];
  effects: string[]; // Required for card viewer
  comments?: Comment[]; // Add comments array
}

export interface OaklandMemoryData {
  title: string;
  description: string;
  date?: string;
  opponent?: string;
  score?: string;
  location?: string;
  section?: string;
  memoryType?: string;
  attendees?: string[];
  tags?: string[];
  imageUrl?: string;
  historicalContext?: string;
  personalSignificance?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  userId?: string;
  teamId?: string;
  visibility?: 'public' | 'private' | 'team' | 'unlisted';  // Add 'unlisted' as a valid option
  allowComments?: boolean;
  createdAt: string;
  updatedAt: string;
  designMetadata?: any;
  cards?: Card[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  username?: string;
  displayName?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  members?: User[];  // Add members field
}

// Update the TeamMember interface to include user property
export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: string;
  user?: User;
  email?: string; // Add email field for mappers.ts
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  teamId?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  text?: string; // Add text field for adaptComment
}

export interface Reaction {
  id: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  commentId?: string;
  type: 'like' | 'love' | 'wow' | 'haha' | 'sad' | 'angry';
  createdAt: string;
  targetType: 'card' | 'comment' | string; // Added to match Reaction in interaction.ts
  targetId: string; // Added to match Reaction in interaction.ts
  user?: User;
}

// DB-specific interfaces for proper type mapping
export interface DbCard {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  thumbnail_url?: string;
  collection_id?: string;
  user_id?: string;
  team_id?: string;
  created_at: string;
  updated_at: string;
  is_public?: boolean;
  tags?: string[];
  design_metadata?: any;
  creator_id: string;
  price?: number;
  edition_size: number;
  rarity: string;
}

// Update the Collection interface to include unlisted visibility
export type CollectionVisibility = 'public' | 'private' | 'team' | 'unlisted';
