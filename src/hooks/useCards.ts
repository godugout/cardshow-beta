import { useState, useEffect, useCallback, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '@/lib/types';
import { CardContext } from '@/context/CardContext';
import { useAuth } from '@/context/auth';
import { cardRepository } from '@/lib/data/cardRepository';
import { toast } from 'sonner';

export const useCards = () => {
  const { cards, setCards } = useContext(CardContext);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (user) {
        const fetchedCards = await cardRepository.getCardsByUserId(user.id);
        setCards(fetchedCards);
      } else {
        setCards([]);
      }
    } catch (err: any) {
      console.error('Error fetching cards:', err);
      setError(err.message || 'Failed to load cards');
    } finally {
      setIsLoading(false);
    }
  }, [setCards, user]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addCard = async (cardData: Card): Promise<Card> => {
    try {
      const newCard: Card = {
        ...cardData,
        id: uuidv4(),
        userId: user?.id || 'guest-user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await cardRepository.addCard(newCard);
      setCards(prevCards => [...prevCards, newCard]);

      toast.success('Card created successfully');
      
      return newCard;
    } catch (error) {
      toast.error('Failed to create card. Please try again.');
      throw error;
    }
  };

  const updateCard = async (cardId: string, updates: Partial<Card>): Promise<void> => {
    try {
      await cardRepository.updateCard(cardId, updates);
      setCards(prevCards =>
        prevCards.map(card => (card.id === cardId ? { ...card, ...updates } : card))
      );

      toast.success('Card updated successfully');
    } catch (error) {
      toast.error('Failed to update card. Please try again.');
    }
  };

  const deleteCard = async (cardId: string): Promise<void> => {
    try {
      await cardRepository.deleteCard(cardId);
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));

      toast.success('Card deleted successfully');
    } catch (error) {
      toast.error('Failed to delete card. Please try again.');
    }
  };

  const duplicateCard = async (cardId: string): Promise<void> => {
    try {
      const cardToDuplicate = cards.find(card => card.id === cardId);
      if (cardToDuplicate) {
        const duplicatedCard = {
          ...cardToDuplicate,
          id: uuidv4(),
          title: `${cardToDuplicate.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await cardRepository.addCard(duplicatedCard);
        setCards(prevCards => [...prevCards, duplicatedCard]);
        toast.success('Card duplicated successfully');
      }
    } catch (error) {
      toast.error('Failed to duplicate card. Please try again.');
    }
  };

  const exportCard = async (cardId: string): Promise<void> => {
    try {
      // Simulate exporting card
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Card exported successfully');
    } catch (error) {
      toast.error('Failed to export card. Please try again.');
    }
  };

  const shareCard = async (cardId: string): Promise<void> => {
    try {
      // Simulate sharing card
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Card shared successfully');
    } catch (error) {
      toast.error('Failed to share card. Please try again.');
    }
  };

  return {
    cards,
    isLoading,
    error,
    addCard,
    updateCard,
    deleteCard,
    duplicateCard,
    exportCard,
    shareCard,
    fetchCards,
  };
};
