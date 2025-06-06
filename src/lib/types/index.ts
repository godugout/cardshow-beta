
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
  visibility: 'public' | 'private' | 'unlisted' | 'team';
  allowComments: boolean;
  designMetadata?: any;
  tags: string[];
  featured: boolean;
  teamId?: string;
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

// Team type
export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  visibility: 'public' | 'private';
  logoUrl?: string;
  logo_url?: string;
  banner_url?: string;
  status?: string;
  website?: string;
  email?: string;
  specialties?: string[];
  primary_color?: string;
  secondary_color?: string;
  createdAt: string;
  updatedAt: string;
}

// Serialization utility
export function serializeMetadata(metadata: any): string {
  return JSON.stringify(metadata);
}

// Re-export commonly used types from cardTypes only
export type { Card, CardTemplate } from './cardTypes';
export type { User } from './user';
