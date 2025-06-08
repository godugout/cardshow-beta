
import { useState, useEffect } from 'react';
import { Collection } from '@/lib/types';
import { collectionOperations } from '@/lib/supabase/collections';
import { toast } from 'sonner';

export const useCommonsCollection = () => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collectionExists, setCollectionExists] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if Commons collection exists
        const { exists, error: checkError } = await collectionOperations.checkExists('Commons', 'system');
        
        if (checkError) {
          setError(checkError);
          setCollectionExists(false);
          return;
        }

        setCollectionExists(exists);

        // If exists, fetch the collection
        if (exists) {
          const { data, error: fetchError } = await collectionOperations.getCollection('commons-collection-id');
          
          if (fetchError) {
            setError(fetchError);
            return;
          }
          
          setCollection(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch collection');
        console.error('Error in useCommonsCollection:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, []);

  const createCommonsCollection = async () => {
    try {
      setLoading(true);
      setError(null);

      const commonsData: Partial<Collection> = {
        name: 'Commons',
        description: 'Community shared collection of cards',
        visibility: 'public',
        allowComments: true,
        userId: 'system',
        tags: ['community', 'shared'],
        featured: true,
        cards: [],
        cardIds: [],
        designMetadata: {},
        isPublic: true
      };

      const { data, error: createError } = await collectionOperations.create(commonsData);
      
      if (createError) {
        setError(createError);
        toast.error('Failed to create Commons collection');
        return;
      }

      setCollection(data);
      setCollectionExists(true);
      toast.success('Commons collection created successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create Commons collection';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error creating Commons collection:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCardToCommons = async (cardId: string) => {
    if (!collection) {
      toast.error('Commons collection not found');
      return;
    }

    try {
      const { error } = await collectionOperations.addCardToCollection(collection.id, cardId);
      
      if (error) {
        toast.error('Failed to add card to Commons');
        return;
      }

      // Update local collection state
      const updatedCollection = {
        ...collection,
        cardIds: [...collection.cardIds, cardId]
      };
      setCollection(updatedCollection);
      
      toast.success('Card added to Commons collection');
    } catch (err: any) {
      toast.error('Failed to add card to Commons');
      console.error('Error adding card to Commons:', err);
    }
  };

  const removeCardFromCommons = async (cardId: string) => {
    if (!collection) {
      toast.error('Commons collection not found');
      return;
    }

    try {
      const { error } = await collectionOperations.removeCardFromCollection(collection.id, cardId);
      
      if (error) {
        toast.error('Failed to remove card from Commons');
        return;
      }

      // Update local collection state
      const updatedCollection = {
        ...collection,
        cardIds: collection.cardIds.filter(id => id !== cardId)
      };
      setCollection(updatedCollection);
      
      toast.success('Card removed from Commons collection');
    } catch (err: any) {
      toast.error('Failed to remove card from Commons');
      console.error('Error removing card from Commons:', err);
    }
  };

  const refreshCollection = async () => {
    if (!collection) return;
    
    try {
      const { data, error } = await collectionOperations.getCollection(collection.id);
      
      if (error) {
        setError(error);
        return;
      }
      
      setCollection(data);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh collection');
      console.error('Error refreshing collection:', err);
    }
  };

  return {
    collection,
    loading,
    error,
    collectionExists,
    createCommonsCollection,
    addCardToCommons,
    removeCardFromCommons,
    refreshCollection
  };
};
