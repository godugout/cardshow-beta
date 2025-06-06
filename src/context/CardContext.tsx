
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Collection, DEFAULT_DESIGN_METADATA } from '@/lib/types/cardTypes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { sampleCards } from '@/data/sampleCards';

interface CardContextType {
  cards: Card[];
  collections: Collection[];
  isLoading: boolean;
  error: string | null;
  addCard: (cardData: Partial<Card>) => Promise<Card>;
  updateCard: (id: string, updates: Partial<Card>) => Promise<Card>;
  deleteCard: (id: string) => Promise<void>;
  getCardById: (id: string) => Card | undefined;
  getCard: (id: string) => Card | undefined;
  searchCards: (query: string) => Card[];
  filterCards: (filters: Record<string, any>) => Card[];
  addCollection: (collectionData: Partial<Collection>) => Promise<Collection>;
  updateCollection: (id: string, updates: Partial<Collection>) => Promise<Collection>;
  deleteCollection: (id: string) => Promise<void>;
  addCardToCollection: (cardId: string, collectionId: string) => Promise<void>;
  removeCardFromCollection: (cardId: string, collectionId: string) => Promise<void>;
  clearError: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
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

  const getCard = useCallback((id: string) => {
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

  const addCollection = useCallback(async (collectionData: Partial<Collection>): Promise<Collection> => {
    const newCollection: Collection = {
      id: uuidv4(),
      name: collectionData.name || 'Untitled Collection',
      description: collectionData.description || '',
      coverImageUrl: collectionData.coverImageUrl || '',
      userId: collectionData.userId || user?.id || 'anonymous',
      cards: [],
      isPublic: collectionData.isPublic || false,
      visibility: collectionData.visibility || 'private',
      allowComments: collectionData.allowComments || true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: collectionData.designMetadata || {},
      cardIds: [],
      ...collectionData,
    };

    setCollections(prev => [newCollection, ...prev]);
    return newCollection;
  }, [user?.id]);

  const updateCollection = useCallback(async (id: string, updates: Partial<Collection>): Promise<Collection> => {
    let updatedCollection: Collection = {} as Collection;
    
    setCollections(prev =>
      prev.map(collection => {
        if (collection.id === id) {
          updatedCollection = {
            ...collection,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          return updatedCollection;
        }
        return collection;
      })
    );
    
    return updatedCollection;
  }, []);

  const deleteCollection = useCallback(async (id: string): Promise<void> => {
    setCollections(prev => prev.filter(collection => collection.id !== id));
  }, []);

  const addCardToCollection = useCallback(async (cardId: string, collectionId: string): Promise<void> => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    setCollections(prev =>
      prev.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            cards: [...collection.cards, card],
            cardIds: [...collection.cardIds, cardId],
            updatedAt: new Date().toISOString()
          };
        }
        return collection;
      })
    );
  }, [cards]);

  const removeCardFromCollection = useCallback(async (cardId: string, collectionId: string): Promise<void> => {
    setCollections(prev =>
      prev.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            cards: collection.cards.filter(card => card.id !== cardId),
            cardIds: collection.cardIds.filter(id => id !== cardId),
            updatedAt: new Date().toISOString()
          };
        }
        return collection;
      })
    );
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: CardContextType = {
    cards,
    collections,
    isLoading,
    error,
    addCard,
    updateCard,
    deleteCard,
    getCardById,
    getCard,
    searchCards,
    filterCards,
    addCollection,
    updateCollection,
    deleteCollection,
    addCardToCollection,
    removeCardFromCollection,
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

// Export types
export type { Card, Collection };
