
export interface CardMetadata {
  category?: string;
  series?: string;
  cardType?: string;
  rarity?: string;
  edition?: string;
  manufacturer?: string;
  year?: string;
  player?: string;
  team?: string;
  position?: string;
  cardNumber?: string;
  set?: string;
  artist?: string;
  [key: string]: JsonValue | undefined;
}

export interface CardStyle {
  template: string;
  effect: string;
  borderRadius: string;
  borderColor: string;
  shadowColor: string;
  frameWidth: number;
  frameColor: string;
  [key: string]: JsonValue | undefined;
}

export interface TextStyle {
  titleColor: string;
  titleAlignment: string;
  titleWeight: string;
  descriptionColor: string;
  [key: string]: JsonValue | undefined;
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
  [key: string]: JsonValue | undefined;
}

export interface DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
  [key: string]: JsonValue | undefined;
}

export interface UnifiedCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string; // Make required to match Card interface
  tags: string[];
  userId: string;
  effects: string[];
  createdAt: string;
  updatedAt: string;
  designMetadata: DesignMetadata;
  
  // Optional extended properties
  name?: string;
  player?: string;
  team?: string;
  year?: string;
  cardNumber?: string;
  set?: string;
  cardType?: string;
  artist?: string;
  backgroundColor?: string;
  specialEffect?: string;
  collectionId?: string;
  price?: number;
  rarity?: string;
  verification_status?: string;
  jersey?: string;
  stats?: {
    battingAverage?: string;
    homeRuns?: string;
    rbis?: string;
    era?: string;
    wins?: string;
    strikeouts?: string;
  };
}

export type Card = UnifiedCard;

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

// Import JsonValue from a base types file
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
