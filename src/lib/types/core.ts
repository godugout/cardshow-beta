
/**
 * Core unified type definitions for CardShow
 * This file consolidates all type definitions to prevent conflicts
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PREMIUM = 'premium',
  CREATOR = 'creator',
  MODERATOR = 'moderator'
}

export interface User extends BaseEntity {
  email: string;
  name?: string;
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  role: UserRole;
  permissions?: string[];
  preferences?: Record<string, any>;
}

// Card effect types
export interface CardEffect {
  id: string;
  type: 'holographic' | 'prismatic' | 'refractor' | 'sparkle' | 'foil' | 'rainbow' | 'custom';
  intensity: number;
  parameters?: Record<string, any>;
}

// Design metadata for cards
export interface DesignMetadata {
  template?: {
    id: string;
    type: string;
    variation?: string;
  };
  layout?: {
    sections: Array<{
      id: string;
      type: string;
      position: { x: number; y: number; width: number; height: number };
      content?: any;
    }>;
  };
  effects?: CardEffect[];
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  typography?: {
    titleFont?: string;
    bodyFont?: string;
    fontSize?: number;
  };
  oaklandMemory?: {
    title: string;
    description: string;
    era?: string;
    memoryType?: string;
    emotions?: string[];
    location?: string;
    gameDate?: string;
    opponent?: string;
    section?: string;
  };
}

// Card interface - unified and complete
export interface Card extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  userId: string;
  tags: string[];
  effects: CardEffect[];
  designMetadata?: DesignMetadata;
  rarity?: string;
  isPublic?: boolean;
  collectionId?: string;
  teamId?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  price?: number;
  editionSize?: number;
  printAvailable?: boolean;
}

// Collection visibility and permissions
export type CollectionVisibility = 'public' | 'private' | 'team' | 'unlisted';

export interface Collection extends BaseEntity {
  name: string;
  description: string;
  userId: string;
  cardIds: string[];
  cards?: Card[];
  coverImageUrl?: string;
  isPublic: boolean;
  visibility: CollectionVisibility;
  allowComments: boolean;
  designMetadata?: Record<string, any>;
  tags?: string[];
  featured?: boolean;
  teamId?: string;
}

// Team interface
export interface Team extends BaseEntity {
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  isActive: boolean;
}

// Team member interface
export interface TeamMember extends BaseEntity {
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

// Comment interface
export interface Comment extends BaseEntity {
  content: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  teamId?: string;
  parentId?: string;
}

// JSON value types for metadata
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject { [key: string]: JsonValue; }
export interface JsonArray extends Array<JsonValue> {}

// Export everything for easy importing
export type {
  BaseEntity,
  User,
  Card,
  Collection,
  Team,
  TeamMember,
  Comment,
  DesignMetadata,
  CardEffect,
  CollectionVisibility,
  JsonValue,
  JsonObject,
  JsonArray
};

export { UserRole };
