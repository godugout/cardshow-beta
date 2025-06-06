
import { useState } from 'react';
import { Collection } from '@/lib/types';
import { collectionRepository } from '@/lib/data/collectionRepository';

export const useCollectionOperations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createCollection = async (collectionData: Partial<Collection>): Promise<Collection> => {
    setIsLoading(true);
    try {
      const newCollectionData: Partial<Collection> = {
        ...collectionData,
        tags: collectionData.tags || [],
        featured: collectionData.featured || false,
        cardIds: [],
        cards: [],
        isPublic: collectionData.visibility === 'public',
        allowComments: collectionData.allowComments !== undefined ? collectionData.allowComments : true,
      };

      const { data, error } = await collectionRepository.createCollection(newCollectionData);
      
      if (error || !data) {
        throw new Error(error || 'Failed to create collection');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCollection,
    isLoading,
  };
};
