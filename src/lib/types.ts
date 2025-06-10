
// Main types export file - avoid duplicate exports

// Re-export everything from core types as primary
export * from './types/core';

// Re-export specific items from other type modules without conflicts
export type { 
  Card as UnifiedCard,
  CardTemplate as UnifiedCardTemplate
} from './types/unifiedCardTypes';

export type {
  CardLayer,
  CardStats,
  CardEffectSettings,
  HotspotData,
  FabricSwatch
} from './types/cardTypes';

export type {
  PremiumCardEffect,
  CardEffectsResult
} from './types/cardEffects';

// Add missing serializeMetadata function
export function serializeMetadata(metadata: any): string {
  return JSON.stringify(metadata);
}
