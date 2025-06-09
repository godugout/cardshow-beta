
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export interface EnhancedCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  userId: string;
  effects: string[];
  createdAt: string;
  updatedAt: string;
  designMetadata: typeof DEFAULT_DESIGN_METADATA;
  rarity: string;
  cardNumber: string;
  seriesId: string;
  artistId: string;
  edition: number;
  editionSize: number;
  releaseDate: string;
  qrCodeData: string;
  hotspots: any[];
}

// Mock data for series
export interface EnhancedSeries {
  id: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  artistId: string;
  cardIds: string[];
  totalCards: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockEnhancedCards: EnhancedCard[] = [
  {
    id: '1',
    title: 'Enhanced Card 1',
    description: 'A premium enhanced card',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['premium', 'enhanced'],
    userId: 'user1',
    effects: ['holographic'],
    rarity: 'legendary',
    cardNumber: '001',
    seriesId: 'series-1',
    artistId: 'artist-1',
    edition: 1,
    editionSize: 100,
    releaseDate: '2024-01-01',
    qrCodeData: 'enhanced-card-1',
    hotspots: [],
    designMetadata: DEFAULT_DESIGN_METADATA,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockSeries: EnhancedSeries[] = [
  {
    id: 'series-1',
    title: 'Premium Series',
    description: 'A collection of premium cards',
    coverImageUrl: '/placeholder.svg',
    artistId: 'artist-1',
    cardIds: ['1'],
    totalCards: 10,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface CardEnhancedContextType {
  enhancedCards: EnhancedCard[];
  addEnhancedCard: (card: EnhancedCard) => void;
  updateEnhancedCard: (id: string, updates: Partial<EnhancedCard>) => void;
  deleteEnhancedCard: (id: string) => void;
  cards: EnhancedCard[];
  series: EnhancedSeries[];
}

const CardEnhancedContext = createContext<CardEnhancedContextType | undefined>(undefined);

export const CardEnhancedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enhancedCards, setEnhancedCards] = useState<EnhancedCard[]>(mockEnhancedCards);
  const [series, setSeries] = useState<EnhancedSeries[]>(mockSeries);

  const addEnhancedCard = (card: EnhancedCard) => {
    setEnhancedCards(prev => [...prev, card]);
  };

  const updateEnhancedCard = (id: string, updates: Partial<EnhancedCard>) => {
    setEnhancedCards(prev => 
      prev.map(card => card.id === id ? { ...card, ...updates } : card)
    );
  };

  const deleteEnhancedCard = (id: string) => {
    setEnhancedCards(prev => prev.filter(card => card.id !== id));
  };

  return (
    <CardEnhancedContext.Provider value={{
      enhancedCards,
      addEnhancedCard,
      updateEnhancedCard,
      deleteEnhancedCard,
      cards: enhancedCards,
      series
    }}>
      {children}
    </CardEnhancedContext.Provider>
  );
};

export const useCardEnhanced = () => {
  const context = useContext(CardEnhancedContext);
  if (!context) {
    throw new Error('useCardEnhanced must be used within CardEnhancedProvider');
  }
  return context;
};

export const useEnhancedCards = () => {
  const context = useContext(CardEnhancedContext);
  if (!context) {
    throw new Error('useEnhancedCards must be used within CardEnhancedProvider');
  }
  return context;
};
