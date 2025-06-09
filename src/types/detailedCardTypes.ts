import { Card } from '@/lib/types/cardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

/**
 * Enhanced card interface for detailed views with additional optional properties
 */
export interface DetailedViewCard extends Card {
  // Baseball specific properties
  player?: string;
  team?: string;
  year?: string;
  position?: string;
  
  // Additional card properties
  isFavorite?: boolean;
  viewCount?: number;
  shareCount?: number;
  downloadCount?: number;
  
  // Market data
  marketPrice?: number;
  lastSoldPrice?: number;
  priceHistory?: Array<{
    date: string;
    price: number;
  }>;
  
  // Enhanced metadata
  gradeInfo?: {
    service: string;
    grade: number;
    serialNumber?: string;
  };
  
  // Social features
  likes?: number;
  comments?: number;
  shares?: number;
}

/**
 * Ensures a card object has all required properties for detailed views
 */
export function ensureDetailedViewCard(card: Partial<Card>): DetailedViewCard {
  return {
    id: card.id || '',
    title: card.title || '',
    description: card.description || '',
    imageUrl: card.imageUrl || '',
    thumbnailUrl: card.thumbnailUrl || card.imageUrl || '',
    tags: card.tags || [],
    userId: card.userId || '',
    effects: card.effects || [],
    createdAt: card.createdAt || new Date().toISOString(),
    updatedAt: card.updatedAt || new Date().toISOString(),
    designMetadata: card.designMetadata || DEFAULT_DESIGN_METADATA,
    
    // Default values for detailed view specific properties
    isFavorite: false,
    viewCount: 0,
    shareCount: 0,
    downloadCount: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    
    // Include any additional properties from the original card
    ...card
  } as DetailedViewCard;
}
