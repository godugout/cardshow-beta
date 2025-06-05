/**
 * Core Types for CRD (Collector's Republic Digital) App
 * Re-exports all types from the centralized type system
 */

// Re-export all types from our centralized type system
export * from './types/index';
export * from './types/cardTypes';
export * from './types/user';
export * from './types/interaction';
export * from './types/collection';

// Define base types used throughout the application

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// Make sure SearchFilters is properly defined as an object type
export interface SearchFilters {
  category?: string;
  tags?: string[];
  type?: string;
  rarity?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Keep the utility function for backward compatibility
import { DesignMetadata } from './types/cardTypes';

/**
 * Utility function to serialize design metadata to JSON-safe format
 * @param metadata The design metadata to serialize
 */
export function serializeMetadata(metadata: DesignMetadata | undefined): Record<string, any> {
  if (!metadata) return {};
  
  // Create a deep copy to avoid modifying the original
  const serialized = JSON.parse(JSON.stringify(metadata)) as Record<string, any>;
  
  // Handle specific nested objects that might need special serialization
  if (metadata.oaklandMemory && typeof metadata.oaklandMemory === 'object') {
    serialized.oaklandMemory = JSON.parse(JSON.stringify(metadata.oaklandMemory));
  }
  
  return serialized;
}
