
import { Card, CardRarity } from './cardTypes';

export interface EnhancedCard extends Card {
  artist?: string;
  artistId?: string;
  editionSize?: number;
  cardNumber?: string;
  marketData?: any;
  seriesId?: string;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  artistId: string;
  createdAt: string;
  updatedAt: string;
  releaseDate: string;
  totalCards: number;
  isPublished: boolean;
  cardIds: string[];
  cards: Card[];
  releaseType: string;
  publisher?: string;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic?: boolean;
  cardIds?: string[];
  ownerId?: string;
}
