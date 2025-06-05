
import { useState, useCallback, useEffect } from 'react';
import { Card } from '@/lib/types/cardTypes';
import { v4 as uuidv4 } from 'uuid';
import { adaptToCard } from '@/lib/adapters/cardAdapter';

// Mock data for development
const initialCards: Card[] = [];

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
          const parsedCards = JSON.parse(savedCards);
          setCards(parsedCards.map((card: any) => adaptToCard(card)));
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

  const addCard = useCallback((cardData: Partial<Card>) => {
    const newCard = adaptToCard({
      id: uuidv4(),
      title: cardData.title || 'Untitled Card',
      description: cardData.description || '',
      imageUrl: cardData.imageUrl || '/placeholder.svg',
      thumbnailUrl: cardData.thumbnailUrl || cardData.imageUrl || '/placeholder.svg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user-1',
      tags: cardData.tags || [],
      effects: cardData.effects || [],
      ...cardData,
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
        },
        ...cardData.designMetadata
      }
    });

    setCards(prevCards => [newCard, ...prevCards]);
    return newCard;
  }, []);

  const updateCard = useCallback((id: string, updates: Partial<Card>) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id
          ? adaptToCard({ 
              ...card, 
              ...updates, 
              updatedAt: new Date().toISOString(),
              designMetadata: {
                ...card.designMetadata,
                ...updates.designMetadata
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

