
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
}

export interface CardStyle {
  template: string;
  effect: string;
  borderRadius: string;
  borderColor: string;
  shadowColor: string;
  frameWidth: number;
  frameColor: string;
}

export interface TextStyle {
  titleColor: string;
  titleAlignment: string;
  titleWeight: string;
  descriptionColor: string;
}

export interface MarketMetadata {
  isPrintable?: boolean;
  isForSale?: boolean;
  includeInCatalog?: boolean;
  price?: number;
  currency?: string;
  availableForSale?: boolean;
  editionSize?: number;
  editionNumber?: number;
}

export interface DesignMetadata {
  cardStyle: CardStyle;
  textStyle: TextStyle;
  cardMetadata: CardMetadata;
  marketMetadata: MarketMetadata;
}

export interface UnifiedCard {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  userId: string;
  effects: string[];
  createdAt: string;
  updatedAt: string;
  designMetadata: DesignMetadata;
  
  // Optional extended properties
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
