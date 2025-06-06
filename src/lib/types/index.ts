
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

// Instagram post type
export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  userId: string;
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

// Re-export commonly used types from cardTypes only
export type { Card, CardTemplate } from './cardTypes';
export type { User } from './user';
