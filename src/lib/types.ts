
// Re-export all types from the consolidated core module
export * from './types/core';

// Legacy compatibility exports
export type { Card as CardData } from './types/core';
export type { Collection as CollectionData } from './types/core';

// Utility function for serializing metadata
export const serializeMetadata = (metadata: any): JsonObject => {
  if (!metadata) return {};
  
  try {
    // Ensure the metadata is a valid JSON object
    return typeof metadata === 'object' ? metadata : {};
  } catch (error) {
    console.warn('Failed to serialize metadata:', error);
    return {};
  }
};
