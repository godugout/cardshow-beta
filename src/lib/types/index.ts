
/**
 * Central type definitions for CRD App
 */

// Base types
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Re-export all card-related types
export * from './cardTypes';
export * from './user';
export * from './interaction';
export * from './collection';
export * from './cardElements';

// Additional utility types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Team Member interface
export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: string;
  user?: any; // User type
}

// Instagram types
export interface InstagramPost {
  id: string;
  postId: string;
  username: string;
  caption?: string;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  thumbnailUrl?: string;
  likes: number;
  comments: number;
  userId: string;
}

// Oakland Memory Data with proper typing
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
  template?: string;
}
