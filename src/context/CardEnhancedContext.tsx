
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CardEffect, BaseEntity } from '@/lib/types/core';
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
export interface Deck extends BaseEntity {
  name: string;
  description: string;
  cards: EnhancedCard[];
  cardIds: string[];
  ownerId: string;
  isPublic: boolean;
  coverImageUrl?: string;
}

// Series interface
export interface EnhancedSeries extends BaseEntity {
  title: string;
  description: string;
  coverImageUrl?: string;
  cardIds: string[];
  totalCards: number;
  isPublished: boolean;
  artistId?: string;
  releaseDate?: string;
  releaseType?: 'standard' | 'limited' | 'exclusive';
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
  favorites: string[];
  addDeck: (deck: Deck) => void;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
  addSeries: (series: EnhancedSeries) => void;
  updateSeries: (id: string, updates: Partial<EnhancedSeries>) => void;
  toggleFavorite: (cardId: string) => void;
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
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const addSeries = (series: EnhancedSeries) => {
    setSeries(prev => [...prev, series]);
  };

  const updateSeries = (id: string, updates: Partial<EnhancedSeries>) => {
    setSeries(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates } : s
    ));
  };

  const toggleFavorite = (cardId: string) => {
    setFavorites(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
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
        favorites,
        addDeck,
        updateDeck,
        addSeries,
        updateSeries,
        toggleFavorite,
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
