
import { useState } from 'react';
import { Card } from '@/lib/types/cardTypes';
import { useCards } from '@/context/CardContext';
import { toastUtils } from '@/lib/utils/toast-utils';

export interface UseCardOperationsOptions {
  onSuccess?: (card: Card) => void;
  onError?: (error: Error) => void;
}

export const useCardOperations = (options?: UseCardOperationsOptions) => {
  const { addCard, updateCard, deleteCard, getCard } = useCards();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCard = async (cardData: Partial<Card>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newCard = await addCard(cardData);
      
      if (newCard) {
        toastUtils.success('Success', 'Card created successfully');
        options?.onSuccess?.(newCard);
        return newCard;
      } else {
        throw new Error('Failed to create card');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      toastUtils.error('Error', error.message);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const modifyCard = async (id: string, updates: Partial<Card>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedCard = await updateCard(id, updates);
      
      if (updatedCard) {
        toastUtils.success('Success', 'Card updated successfully');
        options?.onSuccess?.(updatedCard);
        return updatedCard;
      } else {
        throw new Error('Failed to update card');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      toastUtils.error('Error', error.message);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeCard = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await deleteCard(id);
      
      if (success) {
        toastUtils.success('Success', 'Card deleted successfully');
        return true;
      } else {
        throw new Error('Failed to delete card');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      toastUtils.error('Error', error.message);
      options?.onError?.(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const duplicateCard = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const originalCard = getCard(id);
      if (!originalCard) {
        throw new Error('Card not found');
      }
      
      const duplicatedCard = await addCard({
        ...originalCard,
        title: `${originalCard.title} (Copy)`,
        id: undefined, // Let the system generate a new ID
        createdAt: undefined,
        updatedAt: undefined
      });
      
      if (duplicatedCard) {
        toastUtils.success('Success', 'Card duplicated successfully');
        options?.onSuccess?.(duplicatedCard);
        return duplicatedCard;
      } else {
        throw new Error('Failed to duplicate card');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      toastUtils.error('Error', error.message);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCard,
    modifyCard,
    removeCard,
    duplicateCard,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};

export default useCardOperations;
