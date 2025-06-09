
// Base entity interface for all entities with timestamps
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// JSON value types for flexible data storage
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

// Re-export core types to maintain compatibility
export type { 
  Card, 
  Collection, 
  Team, 
  TeamMember, 
  Comment, 
  Reaction,
  DesignMetadata,
  CardEffect,
  CollectionVisibility,
  CardTemplate,
  UserRole,
  UserPermission
} from './core';
export type { User } from './user';

// Instagram post type
export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  userId: string;
  mediaType?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  postId?: string;
}

// Serialization utility
export function serializeMetadata(metadata: any): string {
  return JSON.stringify(metadata);
}
