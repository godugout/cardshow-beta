
import { Collection } from '@/lib/types';

export const collectionOperations = {
  getPublic: () => Promise.resolve({ data: [], error: null }),
  createCollection: (collection: any) => Promise.resolve({ data: collection, error: null }),
  updateCollection: (id: string, updates: any) => Promise.resolve({ data: { id, ...updates }, error: null }),
  deleteCollection: (id: string) => Promise.resolve({ error: null }),
  addCardToCollection: (collectionId: string, cardId: string) => Promise.resolve({ error: null }),
  removeCardFromCollection: (collectionId: string, cardId: string) => Promise.resolve({ error: null }),
  getCollectionWithCards: (id: string) => Promise.resolve({ data: null, error: null }),
};

export const convertDbCollectionToApp = (dbCollection: any): Collection => {
  return {
    id: dbCollection.id,
    title: dbCollection.title,
    description: dbCollection.description,
    owner_id: dbCollection.owner_id,
    visibility: dbCollection.visibility,
    created_at: dbCollection.created_at,
    updated_at: dbCollection.updated_at,
    cards: dbCollection.cards || [],
  };
};
