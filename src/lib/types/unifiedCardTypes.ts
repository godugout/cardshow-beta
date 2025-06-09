
export interface Card {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  designMetadata: DesignMetadata;
  effects: string[];
  [key: string]: any;
}

// Export UnifiedCard as an alias for Card for backward compatibility
export type UnifiedCard = Card;

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
}

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  titleColor: string;
  titleAlignment: string;
  titleWeight: string;
  descriptionColor: string;
}

export interface CardMetadata {
  category: string;
  series: string;
  cardType: string;
  cardNumber?: string;
  artist?: string;
  effects?: string[];
  rarity?: string;
}

export interface MarketMetadata {
  isPrintable: boolean;
  isForSale: boolean;
  includeInCatalog: boolean;
  price: number;
  currency: string;
  availableForSale: boolean;
  editionSize: number;
  editionNumber: number;
}

export interface DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
  oaklandMemory?: {
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
  };
}

export interface CardTemplate {
  id: string;
  name: string;
  imageUrl: string;
  designMetadata: DesignMetadata;
  description?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  category?: string;
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
  [key: string]: any;
}
