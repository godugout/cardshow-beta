
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
  marketData?: {
    price?: number;
    currency?: string;
    lastSoldPrice?: number;
    availableForSale?: boolean;
  };
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
  releaseDate: string;
  releaseType?: 'standard' | 'limited' | 'special' | 'exclusive';
  cards: EnhancedCard[];
}

// Deck interface
export interface Deck {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  cards: EnhancedCard[];
  cardIds: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
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
    marketData: {
      price: 299.99,
      currency: 'USD',
      lastSoldPrice: 250.00,
      availableForSale: true
    }
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
    releaseDate: '2024-01-01',
    releaseType: 'limited',
    cards: mockEnhancedCards
  }
];

const mockDecks: Deck[] = [
  {
    id: 'deck-1',
    name: 'My First Deck',
    description: 'A starter deck',
    coverImageUrl: '/placeholder.svg',
    cards: mockEnhancedCards,
    cardIds: ['1'],
    ownerId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false
  }
];

interface CardEnhancedContextType {
  enhancedCards: EnhancedCard[];
  addEnhancedCard: (card: EnhancedCard) => void;
  updateEnhancedCard: (id: string, updates: Partial<EnhancedCard>) => void;
  deleteEnhancedCard: (id: string) => void;
  cards: EnhancedCard[];
  series: EnhancedSeries[];
  addSeries: (series: EnhancedSeries) => void;
  updateSeries: (id: string, updates: Partial<EnhancedSeries>) => void;
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
  deleteDeck: (id: string) => void;
  getDeck: (id: string) => Deck | undefined;
  favorites: string[];
  toggleFavorite: (cardId: string) => void;
  isLoading: boolean;
}

const CardEnhancedContext = createContext<CardEnhancedContextType | undefined>(undefined);

export const CardEnhancedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enhancedCards, setEnhancedCards] = useState<EnhancedCard[]>(mockEnhancedCards);
  const [series, setSeries] = useState<EnhancedSeries[]>(mockSeries);
  const [decks, setDecks] = useState<Deck[]>(mockDecks);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const addSeries = (newSeries: EnhancedSeries) => {
    setSeries(prev => [...prev, newSeries]);
  };

  const updateSeries = (id: string, updates: Partial<EnhancedSeries>) => {
    setSeries(prev => 
      prev.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  };

  const addDeck = (deck: Deck) => {
    setDecks(prev => [...prev, deck]);
  };

  const updateDeck = (id: string, updates: Partial<Deck>) => {
    setDecks(prev => 
      prev.map(deck => deck.id === id ? { ...deck, ...updates } : deck)
    );
  };

  const deleteDeck = (id: string) => {
    setDecks(prev => prev.filter(deck => deck.id !== id));
  };

  const getDeck = (id: string) => {
    return decks.find(deck => deck.id === id);
  };

  const toggleFavorite = (cardId: string) => {
    setFavorites(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <CardEnhancedContext.Provider value={{
      enhancedCards,
      addEnhancedCard,
      updateEnhancedCard,
      deleteEnhancedCard,
      cards: enhancedCards,
      series,
      addSeries,
      updateSeries,
      decks,
      addDeck,
      updateDeck,
      deleteDeck,
      getDeck,
      favorites,
      toggleFavorite,
      isLoading
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
