
/**
 * Consolidated Card Types for Cardshow (CRD)
 * This file serves as the central source of truth for all card-related types
 */

import { BaseEntity, JsonValue } from './index';
import { User } from './user';

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
 * Card style definition for visual appearance
 */
export interface CardStyle {
  template: string;      // Required
  effect: string;        // Required
  borderRadius: string;  // Required
  borderWidth?: number;
  borderColor: string;   // Required
  backgroundColor?: string;
  shadowColor: string;   // Required
  frameWidth: number;    // Required
  frameColor: string;    // Required
  [key: string]: JsonValue | undefined;
}

/**
 * Text style definition for card typography
 */
export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  titleColor: string;      // Required
  titleAlignment: string;  // Required
  titleWeight: string;     // Required
  descriptionColor: string; // Required
  [key: string]: JsonValue | undefined;
}

/**
 * Card effect definition for visual effects
 */
export interface CardEffect {
  id: string;
  name: string;
  enabled: boolean;
  settings: CardEffectSettings;
  className?: string;
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
 * Market metadata for card marketplace information
 */
export interface MarketMetadata {
  lastSoldPrice?: number;
  currentAskingPrice?: number;
  estimatedMarketValue?: number;
  isPrintable?: boolean;      // Made optional for compatibility
  isForSale?: boolean;        // Made optional for compatibility
  includeInCatalog?: boolean; // Made optional for compatibility
  price?: number;
  currency?: string;
  availableForSale?: boolean;
  editionSize?: number;
  editionNumber?: number;
  [key: string]: JsonValue | undefined;
}

/**
 * Card metadata for additional card information
 */
export interface CardMetadata {
  edition?: string;
  serialNumber?: string;
  certification?: string;
  gradeScore?: string;
  category?: string;      // Made optional for compatibility
  series?: string;        // Made optional for compatibility
  cardType?: string;      // Made optional for compatibility
  cardStyle?: CardStyle;
  textStyle?: TextStyle;
  effects?: string[];
  layers?: CardLayer[];
  effectClasses?: string;
  [key: string]: JsonValue | undefined;
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
 * Design metadata for card design information
 */
export interface DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
  oaklandMemory?: OaklandMemoryData;
  effects?: string[];
  layers?: CardLayer[];
  effectClasses?: string;
  uploadedImages?: string[];
  [key: string]: JsonValue | undefined;
}

/**
 * Card rarity types
 */
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare' | 'legendary' | 'one-of-one';

/**
 * Reaction interface for card interactions
 */
export interface Reaction {
  id: string;
  userId: string;
  targetType: 'card' | 'comment' | 'collection';
  targetId: string;
  type: 'like' | 'love' | 'wow' | 'haha' | 'sad' | 'angry';
  createdAt: string;
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

/**
 * Main Card interface that can be extended for specific use cases
 */
export interface Card extends BaseEntity {
  title: string;
  description?: string; // Made optional to fix compatibility issues
  imageUrl: string;
  image?: string; // Legacy support for older components
  thumbnailUrl?: string; // Made optional for compatibility
  tags: string[];
  collectionId?: string;
  userId: string;
  teamId?: string;
  isPublic?: boolean;
  metadata?: Record<string, any>;
  effects: string[];
  reactions?: Reaction[];
  comments?: Comment[];
  viewCount?: number;
  
  // Baseball card properties
  player?: string;
  team?: string;
  year?: string;
  jersey?: string;
  set?: string;
  cardNumber?: string;
  cardType?: string;
  artist?: string; // For backward compatibility
  backgroundColor?: string;
  textColor?: string;
  specialEffect?: string;
  fabricSwatches?: FabricSwatch[];
  stats?: CardStats;
  position?: string; // Added to fix sample data errors
  
  // Design related
  name?: string; // Legacy support
  cardStyle?: string;
  backTemplate?: string;
  designMetadata: DesignMetadata;
  
  // Market data
  price?: number;
  estimatedValue?: string;
  condition?: string;
  rarity?: CardRarity;
  gradingScore?: number; // Changed to number for consistency
  
  // Additional fields needed by some components
  creatorId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Card template definition for template system
 */
export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail: string;
  thumbnailUrl?: string; // Added for backward compatibility
  category: string;
  isOfficial?: boolean; // Added for filtering
  popularity?: number; // Added for sorting
  designDefaults: {
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
}
