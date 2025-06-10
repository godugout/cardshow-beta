
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

interface CardEnhancedContextType {
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  activeEffects: CardEffect[];
  setActiveEffects: (effects: CardEffect[]) => void;
  addEffect: (effect: string) => void;
  removeEffect: (effectId: string) => void;
}

const CardEnhancedContext = createContext<CardEnhancedContextType | undefined>(undefined);

export const CardEnhancedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic')
  ]);

  const addEffect = (effect: string) => {
    const newEffect = stringToCardEffect(effect);
    setActiveEffects(prev => [...prev, newEffect]);
  };

  const removeEffect = (effectId: string) => {
    setActiveEffects(prev => prev.filter(effect => effect.id !== effectId));
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
