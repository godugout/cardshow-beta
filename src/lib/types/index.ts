
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

// Collection interface
export interface Collection {
  id: string;
  name: string;
  description: string;
  userId: string;
  cards?: any[];
  cardIds: string[];
  coverImageUrl?: string;
  isPublic: boolean;
  visibility: 'public' | 'private' | 'unlisted';
  allowComments: boolean;
  designMetadata?: any;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

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

// Team member type
export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  permissions: string[];
}

// Serialization utility
export function serializeMetadata(metadata: any): string {
  return JSON.stringify(metadata);
}

// Re-export commonly used types from cardTypes only
export type { Card, CardTemplate } from './cardTypes';
export type { User } from './user';
