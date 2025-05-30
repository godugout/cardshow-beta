/**
 * Card market metadata interface
 */
export interface CardMarketMetadata {
  price?: number;
  currency?: string;
  availableForSale?: boolean;
  editionSize?: number;
  editionNumber?: number;
  isPrintable?: boolean;
  isForSale?: boolean;
  includeInCatalog?: boolean;
  featured?: boolean;
  forSale?: boolean;
}

// Export alias as MarketMetadata for backward compatibility
export type MarketMetadata = CardMarketMetadata;

/**
 * Card metadata interface
 */
export interface CardMetadata {
  category: string;
  series: string;
  cardType: string;
  effects?: string[];
  [key: string]: any;
}

/**
 * Card style interface
 */
export interface CardStyle {
  borderColor?: string;
  backgroundColor?: string;
  titleFont?: string;
  bodyFont?: string;
  cornerRadius?: string;
  borderRadius?: string; // Added for compatibility
  shadowColor?: string;
  frameWidth?: number;
  frameColor?: string;
  template?: string;
  effect?: string;
  borderWidth?: number;
}

/**
 * Text style interface
 */
export interface TextStyle {
  titleColor?: string;
  titleSize?: string;
  bodyColor?: string;
  bodySize?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  titleAlignment?: string;
  titleWeight?: string;
  descriptionColor?: string;
}

/**
 * Card design metadata interface
 */
export interface CardDesignMetadata {
  cardStyle?: CardStyle;
  textStyle?: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: CardMarketMetadata;
  effects?: string[];
  player?: string;
  team?: string;
  year?: string;
  oaklandMemory?: any; // Add oaklandMemory property
  layers?: any[]; // Add layers for serialization support
}

// Export alias as DesignMetadata for backward compatibility
export type DesignMetadata = CardDesignMetadata;

/**
 * Fabric swatch type for material simulations
 */
export interface FabricSwatch {
  id: string;
  name: string;
  color: string;
  texture?: string;
  normalMap?: string;
  type: string;
  materialType?: 'fabric' | 'leather' | 'plastic' | 'metal' | 'paper';
  roughness?: number;
  metalness?: number;
  // Additional properties needed by CardBack component
  year?: string;
  team?: string;
  position?: string;
}

/**
 * Card interface for basic card data
 */
export interface Card {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  player?: string;
  team?: string;
  year?: string;
  isPublic?: boolean;
  designMetadata: CardDesignMetadata; // Required property
  ownerId?: string; 
  collectionId?: string;
  userId?: string;
  teamId?: string; // Add teamId property
  effects?: string[];
  reactions?: any[];
  comments?: any[]; // Add comments property
  artist?: string;
  set?: string;
  rarity?: string;
  viewCount?: number;
  cardNumber?: string;
  fabricSwatches?: FabricSwatch[];
  name?: string;
  jersey?: string;
  seriesId?: string; // Add seriesId property
  backgroundColor?: string; // Add backgroundColor
  specialEffect?: string; // Add specialEffect
  cardType?: string; // Add cardType for sampleCards.ts
  textColor?: string; // Add textColor for sampleCards.ts
}

/**
 * Card template interface for reusable card designs
 */
export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail: string;
  thumbnailUrl?: string;
  category: string;
  tags?: string[];
  popularity?: number;
  isOfficial?: boolean;
  isPublic?: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  designDefaults?: {
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
  cardStyle?: Partial<CardStyle>;
  textStyle?: Partial<TextStyle>;
  layers?: any[];
  effects?: string[];
  backgroundColor?: string;
  imageUrl?: string;
  [key: string]: any;
}

/**
 * Card rarity enum
 */
export enum CardRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  ULTRA_RARE = 'ultra-rare',
  LEGENDARY = 'legendary'
}

/**
 * Hotspot data interface for interactive card elements
 */
export interface HotspotData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  type: string;
  visible?: boolean; // Add visible property
}

/**
 * Card layer interface for layered card elements
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
 * Card effect interface
 */
export interface CardEffect {
  id: string;
  name: string;
  enabled: boolean;
  settings: Record<string, any>;
  className?: string;
  iconUrl?: string;
  description?: string;
  category?: string;
}

/**
 * Card effect settings interface
 */
export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: any;
}

/**
 * Stats interface for baseball cards
 */
export interface CardStats {
  battingAverage?: string;
  homeRuns?: string;
  rbis?: string;
  era?: string;
  wins?: string;
  strikeouts?: string;
}

/**
 * Export other card types to ensure consistency
 */
export * from './cardElements';

// Add DEFAULT_CARD_METADATA to satisfy CardMetadata interface
export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'general',
  series: 'base',
  cardType: 'standard'
};

// Add a helper function to ensure valid cardMetadata
export function ensureValidCardMetadata(metadata?: Partial<CardMetadata> | null): CardMetadata {
  if (!metadata) return { ...DEFAULT_CARD_METADATA };
  
  return {
    category: metadata.category || DEFAULT_CARD_METADATA.category,
    series: metadata.series || DEFAULT_CARD_METADATA.series,
    cardType: metadata.cardType || DEFAULT_CARD_METADATA.cardType,
    ...metadata
  };
}

// Add a helper function to ensure valid design metadata
export function ensureValidDesignMetadata(designMetadata?: Partial<CardDesignMetadata> | null): CardDesignMetadata {
  if (!designMetadata) {
    return {
      cardStyle: {},
      textStyle: {},
      cardMetadata: { ...DEFAULT_CARD_METADATA },
      marketMetadata: {}
    };
  }
  
  return {
    cardStyle: designMetadata.cardStyle || {},
    textStyle: designMetadata.textStyle || {},
    cardMetadata: ensureValidCardMetadata(designMetadata.cardMetadata),
    marketMetadata: designMetadata.marketMetadata || {},
    effects: designMetadata.effects || []
  };
}
