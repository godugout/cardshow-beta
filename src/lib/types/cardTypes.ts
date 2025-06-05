import { CardDesignMetadata } from './templateTypes';

export interface Reaction {
  id: string;
  userId: string;
  type: 'like' | 'dislike' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
  createdAt: string;
  targetType: 'card' | 'comment';
  targetId: string;
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

export interface Card {
  id: string;
  title: string;
  name?: string; // For compatibility
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
  stats?: CardStats; // Add stats property
  
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
  rarity?: string;
  condition?: string;
  value?: number;
  gradingCompany?: string;
  gradingScore?: number;
}

export interface CardMetadata {
  category?: string;
  cardType?: string;
  series?: string;
}

export interface CardStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
}
