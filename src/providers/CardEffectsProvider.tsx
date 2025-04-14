
import React, { createContext, useContext, useState, ReactNode } from 'react';
import useCardEffects, { CardEffectsResult } from '@/hooks/card-effects/useCardEffects';

// Create context with default value
const CardEffectsContext = createContext<CardEffectsResult | undefined>(undefined);

interface CardEffectsProviderProps {
  children: ReactNode;
}

export const CardEffectsProvider: React.FC<CardEffectsProviderProps> = ({ children }) => {
  // Use the hook
  const cardEffects = useCardEffects();
  
  return (
    <CardEffectsContext.Provider value={cardEffects}>
      {children}
    </CardEffectsContext.Provider>
  );
};

// Hook to use the card effects context
export const useCardEffectsContext = () => {
  const context = useContext(CardEffectsContext);
  if (context === undefined) {
    throw new Error('useCardEffectsContext must be used within a CardEffectsProvider');
  }
  return context;
};

export default CardEffectsProvider;
