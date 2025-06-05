
import { useState, useCallback, useEffect } from 'react';
import { Card } from '@/lib/types/card';
import { v4 as uuidv4 } from 'uuid';
import { adaptToLegacyCard } from '@/lib/adapters/cardAdapter';
import { Card as CardType } from '@/lib/types/cardTypes';

// Mock data for development
const initialCards: Card[] = [
  adaptToLegacyCard({
    id: '1',
    title: 'Sample Card',
    description: 'This is a sample card for development',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['sample', 'development'],
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    effects: [],
    designMetadata: {
      cardStyle: {
        template: 'classic',
        effect: 'none',
        borderRadius: '8px',
        borderColor: '#000000',
        shadowColor: 'rgba(0,0,0,0.2)',
        frameWidth: 2,
        frameColor: '#000000'
      },
      textStyle: {
        titleColor: '#000000',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#333333'
      },
      cardMetadata: {
        category: 'general'
      },
      marketMetadata: {
        isPrintable: false,
        isForSale: false,
        includeInCatalog: false,
        price: 0,
        currency: 'USD',
        availableForSale: false,
        editionSize: 1,
        editionNumber: 1
      }
    }
  }),
];

export const useCardOperations = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load cards from localStorage on initial render
  useEffect(() => {
    const loadCards = () => {
      try {
        const savedCards = localStorage.getItem('cards');
        if (savedCards) {
          // Parse stored cards and ensure they match the current Card type requirements
          const parsedCards = JSON.parse(savedCards);
          setCards(parsedCards.map((card: Partial<Card>) => adaptToLegacyCard(card)));
        }
      } catch (err) {
        console.error('Error loading cards from storage:', err);
      }
    };

    loadCards();
  }, []);

  // Update localStorage whenever cards change
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const getCardById = useCallback((id: string): Card | undefined => {
    return cards.find(card => card.id === id);
  }, [cards]);

  const addCard = useCallback((card: Omit<CardType, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard = adaptToLegacyCard({
      ...card,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        ...card.designMetadata,
        marketMetadata: {
          isPrintable: false,
          isForSale: false,
          includeInCatalog: false,
          price: 0,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1,
          editionNumber: 1,
          ...card.designMetadata?.marketMetadata
        }
      }
    });

    setCards(prevCards => [...prevCards, newCard]);
    return newCard;
  }, []);

  const updateCard = useCallback((id: string, updates: Partial<CardType>) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id
          ? adaptToLegacyCard({ 
              ...card, 
              ...updates, 
              updatedAt: new Date().toISOString(),
              designMetadata: {
                ...card.designMetadata,
                ...updates.designMetadata,
                marketMetadata: {
                  isPrintable: false,
                  isForSale: false,
                  includeInCatalog: false,
                  ...card.designMetadata?.marketMetadata,
                  ...updates.designMetadata?.marketMetadata
                }
              }
            })
          : card
      )
    );
  }, []);

  const deleteCard = useCallback((id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  }, []);

  return {
    cards,
    isLoading,
    error,
    getCardById,
    addCard,
    updateCard,
    deleteCard,
  };
};

// Export types for consumers
export type CardOperations = ReturnType<typeof useCardOperations>;
