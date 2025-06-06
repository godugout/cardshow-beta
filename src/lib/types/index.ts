
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

// Re-export commonly used types
export type { Card, CardTemplate, Reaction, Comment } from './cardTypes';
export type { User } from './user';
