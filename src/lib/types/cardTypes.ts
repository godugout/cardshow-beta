/**
 * Consolidated Card Types for Cardshow (CRD)
 * This file serves as the central source of truth for all card-related types
 */

import { BaseEntity, JsonValue } from './index';
import { Reaction, Comment } from './interaction';
import { User } from './user';

/**
 * Card rarity types
 */
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare' | 'legendary' | 'one-of-one';

/**
 * Card style definition for visual appearance
 */
export interface CardStyle {
  template: string;      
  effect: string;        
  borderRadius: string;  
  borderWidth?: number;  // Add borderWidth property
  borderColor: string;   
  backgroundColor?: string;
  shadowColor: string;   
  frameWidth: number;    
  frameColor: string;    
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
  titleFont?: string;      
  titleSize?: string;      
  titleColor: string;      
  titleAlignment: string;  
  titleWeight: string;     
  descriptionFont?: string;
  descriptionSize?: string;
  descriptionColor: string; 
  [key: string]: JsonValue | undefined;
}

/**
 * Market metadata for card marketplace information
 */
export interface MarketMetadata {
  lastSoldPrice?: number;
  currentAskingPrice?: number;
  estimatedMarketValue?: number;
  isPrintable: boolean;      
  isForSale: boolean;       
  includeInCatalog: boolean; 
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
  category?: string;      
  series?: string;        
  cardType?: string;      
  [key: string]: JsonValue | undefined;
}

/**
 * Oakland memory data - now extends JsonValue compatibility
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
  effects?: string[];
  effectClasses?: string;
  oaklandMemory?: OaklandMemoryData;
  [key: string]: JsonValue | undefined;
}

/**
 * Card effect definition for visual effects
 */
export interface CardEffect {
  id: string;
  name: string;
  enabled: boolean;
  settings: Record<string, any>;
  className?: string;
  category?: string;
  description?: string;
  iconUrl?: string;
}

/**
 * Card template definition for template system - CONSOLIDATED DEFINITION
 */
export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  thumbnailUrl?: string; 
  category: string;
  isOfficial?: boolean; 
  popularity?: number; 
  tags?: string[]; // Add tags property
  designDefaults: {
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
  previewUrl?: string;
  sport?: string;
  style?: string;
}

/**
 * Card layer data structure for layer panel - CONSOLIDATED DEFINITION
 */
export interface CardLayer {
  id: string;
  type: 'image' | 'text' | 'shape' | 'effect' | 'sticker';
  name: string; // Add required name property
  content: string | any;
  visible: boolean;
  locked: boolean;
  opacity: number;
  zIndex: number;
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
  data?: Record<string, any>;
  style?: Record<string, any>;
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
 * Hotspot data for interactive card elements - UPDATED WITH ALL TYPES
 */
export interface HotspotData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'link' | 'video' | 'audio' | 'popup' | 'animation' | 'text' | 'image';
  visible: boolean; // Add missing visible property
  content: {
    title?: string;
    description?: string;
    url?: string;
    mediaId?: string;
    action?: string;
    text?: string; // Add for text type
    imageUrl?: string; // Add for image type
  };
  style?: {
    borderColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    opacity?: number;
  };
}

/**
 * Base Card interface containing common properties
 */
export interface BaseCard extends BaseEntity {
  title: string;
  description: string; 
  imageUrl: string;
  thumbnailUrl: string; 
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
  artist?: string; 
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  textColor?: string; 
  specialEffect?: string;
  
  // Design related
  cardStyle?: string;
  backTemplate?: string;
  designMetadata: DesignMetadata;
  fabricSwatches?: FabricSwatch[];
  
  // Market data
  price?: number;
  estimatedValue?: string;
  condition?: string;
  rarity?: CardRarity;
  
  // Additional fields
  creatorId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Main Card interface
 */
export interface Card extends BaseCard {}

/**
 * Fabric swatch definition
 */
export interface FabricSwatch {
  id: string;
  name: string;
  color: string;
  texture?: string;
  material?: string;
  imageUrl?: string;
  type?: string;
  year?: string;
  team?: string;
  position?: string;
}

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'classic',
  effect: 'none',
  borderRadius: '8px',
  borderWidth: 2,
  borderColor: '#000000',
  backgroundColor: '#FFFFFF',
  shadowColor: 'rgba(0,0,0,0.2)',
  frameWidth: 2,
  frameColor: '#000000',
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: 'Inter',
  fontSize: '16px',
  fontWeight: 'normal',
  color: '#000000',
  titleFont: 'Inter',
  titleSize: '24px',
  titleColor: '#000000',
  titleAlignment: 'center',
  titleWeight: 'bold',
  descriptionFont: 'Inter',
  descriptionSize: '14px',
  descriptionColor: '#333333',
};

export const DEFAULT_MARKET_METADATA: MarketMetadata = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: false,
  price: 0,
  currency: 'USD',
  availableForSale: false,
  editionSize: 1,
  editionNumber: 1
};

export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'general',
  series: 'base',
  cardType: 'standard',
};

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  cardMetadata: DEFAULT_CARD_METADATA,
  marketMetadata: DEFAULT_MARKET_METADATA,
};
