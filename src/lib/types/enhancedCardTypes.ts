
import { Card, CardDesignMetadata, HotspotData, CardRarity } from './cardTypes';

export interface EnhancedCard extends Card {
  // Additional properties specific to enhanced cards
  seriesId?: string; 
  deckId?: string;
  specialFeatures?: string[];
  interactiveElements?: string[];
  graded?: boolean;
  gradingService?: string;
  hotspots?: HotspotData[];
  backSideImage?: string;
  edition?: number;
  editionSize?: number;
  releaseDate?: string;
  qrCodeData?: string;
  marketData?: {
    price?: number;
    currency?: string;
    lastSoldPrice?: number;
    availableForSale?: boolean;
  };
  artistId?: string;
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
  cards: EnhancedCard[];
  cardIds: string[];
  releaseType: 'standard' | 'limited' | 'special';
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  cards: EnhancedCard[];
  cardIds: string[];
  isPublic: boolean;
}
