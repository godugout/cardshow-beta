
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, DEFAULT_DESIGN_METADATA } from '@/lib/types/cardTypes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { sampleCards } from '@/data/sampleCards';

interface CardContextType {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  addCard: (cardData: Partial<Card>) => Promise<Card>;
  updateCard: (id: string, updates: Partial<Card>) => Promise<Card>;
  deleteCard: (id: string) => Promise<void>;
  getCardById: (id: string) => Card | undefined;
  searchCards: (query: string) => Card[];
  filterCards: (filters: Record<string, any>) => Card[];
  clearError: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with sample cards
  useEffect(() => {
    const cardsWithDefaults = sampleCards.map(card => ({
      ...card,
      designMetadata: card.designMetadata || DEFAULT_DESIGN_METADATA
    }));
    setCards(cardsWithDefaults);
  }, []);

  const addCard = async (cardData: Partial<Card>): Promise<Card> => {
    try {
      setIsLoading(true);
      setError(null);

      const newCard: Card = {
        id: uuidv4(),
        title: cardData.title || 'Untitled Card',
        description: cardData.description || '',
        imageUrl: cardData.imageUrl || '',
        thumbnailUrl: cardData.thumbnailUrl || cardData.imageUrl || '',
        tags: cardData.tags || [],
        userId: cardData.userId || user?.id || 'anonymous',
        effects: cardData.effects || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        designMetadata: {
          ...DEFAULT_DESIGN_METADATA,
          ...cardData.designMetadata
        },
        ...cardData,
      };

      setCards(prev => [newCard, ...prev]);
      return newCard;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create card';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCard = useCallback(async (id: string, updates: Partial<Card>) => {
    setIsLoading(true);
    return new Promise<Card>((resolve) => {
      setTimeout(() => {
        let updatedCard: Card = {} as Card;
        
        setCards(prevCards =>
          prevCards.map(card => {
            if (card.id === id) {
              updatedCard = { 
                ...card, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              };
              return updatedCard;
            }
            return card;
          })
        );
        
        setIsLoading(false);
        resolve(updatedCard);
      }, 300);
    });
  }, []);

  const deleteCard = useCallback(async (id: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
        setIsLoading(false);
        resolve();
      }, 300);
    });
  }, []);

  const getCardById = useCallback((id: string) => {
    return cards.find(card => card.id === id);
  }, [cards]);

  const searchCards = useCallback((query: string) => {
    return cards.filter(card => card.title.toLowerCase().includes(query.toLowerCase()));
  }, [cards]);

  const filterCards = useCallback((filters: Record<string, any>) => {
    return cards.filter(card => {
      for (const key in filters) {
        if (card[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  }, [cards]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: CardContextType = {
    cards,
    isLoading,
    error,
    addCard,
    updateCard,
    deleteCard,
    getCardById,
    searchCards,
    filterCards,
    clearError
  };

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};

export const useCardContext = () => useContext(CardContext);

// Use 'export type' for types to fix the isolatedModules issue
export type { Card };
