
import { JsonValue } from './index';

export interface Reaction {
  id: string;
  userId: string;
  type: 'like' | 'dislike' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  createdAt: string;
  targetType: 'card' | 'comment' | 'collection';
  targetId: string;
  cardId?: string;
  collectionId?: string;
  commentId?: string;
}

export interface CardStats {
  views: number;
  likes: number;
  downloads: number;
  shares: number;
  comments: number;
  favorites: number;
  rating: number;
}

export interface AssetPerformance {
  views: number;
  downloads: number;
  likes: number;
  shares: number;
  rating: number;
  usageCount: number;
}

export interface AssetDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

export interface FabricSwatch {
  id: string;
  name: string;
  color: string;
  texture?: string;
  pattern?: string;
  type?: string;
  year?: string;
  team?: string;
  position?: string;
}

export interface CardLayer {
  id: string;
  name: string;
  type: 'image' | 'text' | 'shape' | 'effect';
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: string;
  transform: {
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    z: number;
  };
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
  content?: any;
  style?: any;
  textStyle?: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    color: string;
    textAlign: string;
    titleColor?: string;
    titleAlignment?: string;
    titleWeight?: string;
    descriptionColor?: string;
  };
  color?: string;
  shapeType?: string;
  zIndex?: number;
  // Legacy properties for backward compatibility
  x?: number;
  y?: number;
  width?: number | 'auto';
  height?: number | 'auto';
  imageUrl?: string;
}

export interface CardEffect {
  id: string;
  name: string;
  type: string;
  settings: Record<string, any>;
  enabled: boolean;
}

export interface HotspotData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: {
    title?: string;
    description?: string;
    text?: string;
    url?: string;
    imageUrl?: string;
  };
  type: 'text' | 'image' | 'video' | 'link';
  visible?: boolean;
  style?: {
    borderColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    opacity?: number;
  };
}

export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'ultra-rare' | 'one-of-one';

export interface CardStyle {
  template?: string;
  effect?: string;
  borderRadius?: string;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  shadowColor?: string;
  frameWidth?: number;
  frameColor?: string;
}

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  titleColor?: string;
  titleAlignment?: string;
  titleWeight?: string;
  descriptionColor?: string;
}

export interface MarketMetadata {
  isPrintable: boolean;
  isForSale: boolean;
  includeInCatalog: boolean;
  price?: number;
  currency?: string;
  availableForSale?: boolean;
  editionSize?: number;
  editionNumber?: number;
  lastSoldPrice?: number;
  currentAskingPrice?: number;
  estimatedMarketValue?: number;
}

export interface CardMetadata {
  category?: string;
  series?: string;
  cardType?: string;
  rarity?: string;
  condition?: string;
  year?: string;
  manufacturer?: string;
  setName?: string;
  cardNumber?: string;
}

export interface OaklandMemoryMetadata {
  date?: string;
  opponent?: string;
  score?: string;
  location?: string;
  section?: string;
  memoryType?: string;
  attendees?: string[];
  template?: string;
  teamId?: string;
  historicalContext?: string;
  personalSignificance?: string;
}

export interface DesignMetadata {
  cardStyle?: CardStyle;
  textStyle?: TextStyle;
  marketMetadata?: MarketMetadata;
  cardMetadata?: CardMetadata;
  oaklandMemory?: OaklandMemoryMetadata;
  effects?: string[];
  effectSettings?: Record<string, any>;
  effectClasses?: string;
}

export interface CardDesignMetadata extends DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  marketMetadata: MarketMetadata;
  cardMetadata: CardMetadata;
}

export interface Card {
  id: string;
  title: string;
  name?: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  userId: string;
  collectionId?: string;
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  reactions?: Reaction[];
  effects: string[];
  designMetadata: CardDesignMetadata;
  stats?: CardStats;
  rarity?: CardRarity;
  viewCount?: number;
  fabricSwatches?: FabricSwatch[];
  borderRadius?: string;
  borderColor?: string;
  price?: number;
  
  // Sports card specific fields
  player?: string;
  team?: string;
  jersey?: string;
  year?: string;
  set?: string;
  cardNumber?: string;
  cardType?: string;
  artist?: string;
  backgroundColor?: string;
  textColor?: string;
  specialEffect?: string;
  
  // Additional metadata
  category?: string;
  condition?: string;
  value?: number;
  gradingCompany?: string;
  gradingScore?: number;
}

export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  previewUrl?: string;
  category: string;
  tags?: string[];
  isOfficial?: boolean;
  popularity?: number;
  style?: string;
  sport?: string;
  designDefaults: {
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
}

export interface EnhancedCard extends Card {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  tags: string[];
  userId: string;
  effects: string[];
  createdAt: string;
  updatedAt: string;
  designMetadata: CardDesignMetadata;
}

// Default values
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
  editionNumber: 1,
};

export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'general',
  series: 'base',
  cardType: 'standard',
};

export const DEFAULT_DESIGN_METADATA: CardDesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  marketMetadata: DEFAULT_MARKET_METADATA,
  cardMetadata: DEFAULT_CARD_METADATA,
  effects: [],
  effectSettings: {},
};
