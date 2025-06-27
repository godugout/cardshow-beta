
import { create } from 'zustand';
import { Card } from '@/lib/types/unifiedCardTypes';
import { createBlankCard } from '@/lib/utils/cardDefaults';

interface CardStore {
  currentCard: Partial<Card>;
  setCurrentCard: (card: Partial<Card>) => void;
  updateCurrentCard: (updates: Partial<Card>) => void;
  resetCurrentCard: (userId: string) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  currentCard: {},
  setCurrentCard: (card) => set({ currentCard: card }),
  updateCurrentCard: (updates) => set((state) => ({ 
    currentCard: { ...state.currentCard, ...updates } 
  })),
  // Fix: createBlankCard expects no arguments
  resetCurrentCard: (userId) => set({ currentCard: createBlankCard() }),
}));
