
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

// Enhanced card interface with additional properties
export interface EnhancedCard extends Card {
  artistId?: string;
  editionSize?: number;
  marketData?: {
    lastSoldPrice?: number;
  };
}

// Deck interface
export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: EnhancedCard[];
  cardIds: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  coverImageUrl?: string;
}

// Series interface
export interface EnhancedSeries {
  id: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  cardIds: string[];
  totalCards: number;
  isPublished: boolean;
  artistId?: string;
}

interface CardEnhancedContextType {
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  activeEffects: CardEffect[];
  setActiveEffects: (effects: CardEffect[]) => void;
  addEffect: (effect: string) => void;
  removeEffect: (effectId: string) => void;
  cards: EnhancedCard[];
  series: EnhancedSeries[];
  decks: Deck[];
  addDeck: (deck: Deck) => void;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
}

const CardEnhancedContext = createContext<CardEnhancedContextType | undefined>(undefined);

export const CardEnhancedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic')
  ]);
  const [cards, setCards] = useState<EnhancedCard[]>([]);
  const [series, setSeries] = useState<EnhancedSeries[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);

  const addEffect = (effect: string) => {
    const newEffect = stringToCardEffect(effect);
    setActiveEffects(prev => [...prev, newEffect]);
  };

  const removeEffect = (effectId: string) => {
    setActiveEffects(prev => prev.filter(effect => effect.id !== effectId));
  };

  const addDeck = (deck: Deck) => {
    setDecks(prev => [...prev, deck]);
  };

  const updateDeck = (id: string, updates: Partial<Deck>) => {
    setDecks(prev => prev.map(deck => 
      deck.id === id ? { ...deck, ...updates } : deck
    ));
  };

  return (
    <CardEnhancedContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        activeEffects,
        setActiveEffects,
        addEffect,
        removeEffect,
        cards,
        series,
        decks,
        addDeck,
        updateDeck,
      }}
    >
      {children}
    </CardEnhancedContext.Provider>
  );
};

export const useCardEnhanced = () => {
  const context = useContext(CardEnhancedContext);
  if (context === undefined) {
    throw new Error('useCardEnhanced must be used within a CardEnhancedProvider');
  }
  return context;
};

// Export alias for backward compatibility
export const useEnhancedCards = useCardEnhanced;
