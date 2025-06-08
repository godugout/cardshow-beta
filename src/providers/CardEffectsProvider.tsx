
import React, { createContext, useContext, ReactNode } from 'react';
import { useCardEffects } from '@/hooks/card-effects/useCardEffects';
import { CardEffectsResult } from '@/lib/types/cardEffects';

const CardEffectsContext = createContext<CardEffectsResult | undefined>(undefined);

interface CardEffectsProviderProps {
  children: ReactNode;
}

export const CardEffectsProvider: React.FC<CardEffectsProviderProps> = ({ children }) => {
  const cardEffects = useCardEffects();
  
  return (
    <CardEffectsContext.Provider value={cardEffects}>
      {children}
    </CardEffectsContext.Provider>
  );
};

export const useCardEffectsContext = () => {
  const context = useContext(CardEffectsContext);
  if (context === undefined) {
    throw new Error('useCardEffectsContext must be used within a CardEffectsProvider');
  }
  return context;
};

export default CardEffectsProvider;
