
/**
 * Consolidated Card Types for Cardshow (CRD)
 * This file consolidates all type definitions to prevent conflicts
 */

import { BaseEntity, JsonValue } from './index';
import { User } from './user';

// Re-export everything from unifiedCardTypes for backward compatibility
export type {
  Card,
  CardStyle,
  TextStyle,
  CardMetadata,
  DesignMetadata,
  MarketMetadata,
  CardTemplate,
  UnifiedCard,
  CardEffect
} from './unifiedCardTypes';

/**
 * Hotspot data for interactive cards
 */
export interface HotspotData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  type: 'text' | 'link' | 'image' | 'video';
  visible: boolean;
}

/**
 * Fabric Swatch definition for card memorabilia
 */
export interface FabricSwatch {
  type: string;
  team: string;
  year: string;
  manufacturer: string;
  position: string;
  size: string;
}

/**
 * Card statistics for sports cards
 */
export interface CardStats {
  battingAverage?: string;
  homeRuns?: string;
  rbis?: string;
  era?: string;
  wins?: string;
  strikeouts?: string;
  careerYears?: string;
  ranking?: string;
}

/**
 * Settings for card effects
 */
export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: JsonValue | undefined;
}

/**
 * Card layer for the card creation canvas
 */
export interface CardLayer {
  id: string;
  type: 'image' | 'text' | 'shape' | 'effect';
  content: string | any;
  position: {
    x: number;
    y: number;
    z: number;
  };
  size: {
    width: number | 'auto';
    height: number | 'auto';
  };
  rotation: number;
  opacity: number;
  zIndex: number;
  visible?: boolean;
  style?: Record<string, any>;
  locked?: boolean;
  effectIds?: string[];
  textStyle?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
  };
  imageUrl?: string;
  shapeType?: string;
  color?: string;
  [key: string]: any;
}

/**
 * Oakland Memory Data definition
 */
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
  [key: string]: JsonValue | undefined;
}

/**
 * Card rarity types - now as string to match UnifiedCard
 */
export type CardRarity = string;

/**
 * Reaction interface for card interactions - aligned with core types
 */
export interface Reaction {
  id: string;
  userId: string;
  targetType: 'card' | 'comment' | 'collection';
  targetId: string;
  type: 'like' | 'heart' | 'star' | 'thumbs_up' | 'thumbs_down'; // Updated to match core
  createdAt: string;
  updatedAt: string;
  user?: User;
}

/**
 * Comment interface for card comments
 */
export interface Comment {
  id: string;
  content: string;
  userId: string;
  cardId?: string;
  collectionId?: string;
  teamId?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}
