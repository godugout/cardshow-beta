
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '@/lib/types';
import { useCards as useCardContext } from '@/context/CardContext';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useCards = () => {
  const { cards, addCard: contextAddCard, updateCard: contextUpdateCard, deleteCard: contextDeleteCard, getCard } = useCardContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Cards are already managed by context
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error fetching cards:', err);
      setError(err.message || 'Failed to load cards');
      setIsLoading(false);
    }
  }, []);

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

      await contextAddCard(newCard);
      toast.success('Card created successfully');
      
      return newCard;
    } catch (error) {
      toast.error('Failed to create card. Please try again.');
      throw error;
    }
  };

  const updateCard = async (cardId: string, updates: Partial<Card>): Promise<void> => {
    try {
      await contextUpdateCard(cardId, updates);
      toast.success('Card updated successfully');
    } catch (error) {
      toast.error('Failed to update card. Please try again.');
    }
  };

  const deleteCard = async (cardId: string): Promise<void> => {
    try {
      await contextDeleteCard(cardId);
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

        await contextAddCard(duplicatedCard);
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
    getCard,
    addCard,
    updateCard,
    deleteCard,
    duplicateCard,
    exportCard,
    shareCard,
    fetchCards,
  };
};
