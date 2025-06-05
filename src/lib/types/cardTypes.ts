
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
  borderWidth?: number;
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
  titleColor: string;      
  titleAlignment: string;  
  titleWeight: string;     
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
 * Design metadata for card design information
 */
export interface DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
  effects?: string[];
  effectClasses?: string;
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
  textColor?: string; 
  specialEffect?: string;
  
  // Design related
  name?: string; 
  cardStyle?: string;
  backTemplate?: string;
  designMetadata: DesignMetadata;
  
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
 * Card template definition for template system
 */
export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail: string;
  thumbnailUrl?: string; 
  category: string;
  isOfficial?: boolean; 
  popularity?: number; 
  designDefaults: {
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
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
  titleColor: '#000000',
  titleAlignment: 'center',
  titleWeight: 'bold',
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
