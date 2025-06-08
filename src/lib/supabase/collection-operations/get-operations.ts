import { supabase } from '../client';
import { convertDbToCollection } from '../utils/collection-converter';

export const getUserCollections = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user collections:', error);
      return { data: [], error };
    }

    const collections = data.map(convertDbToCollection);
    return { data: collections, error: null };
  } catch (error) {
    console.error('Unexpected error fetching user collections:', error);
    return { data: [], error: error instanceof Error ? error.message : 'Unexpected error' };
  }
};

export const getCollectionById = async (collectionId: string) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('id', collectionId)
      .single();

    if (error) {
      console.error('Error fetching collection by ID:', error);
      return { data: null, error };
    }

    const collection = convertDbToCollection(data);
    return { data: collection, error: null };
  } catch (error) {
    console.error('Unexpected error fetching collection by ID:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unexpected error' };
  }
};

export const getPublicCollections = async () => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('visibility', 'public')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public collections:', error);
      return { data: [], error };
    }

    const collections = data.map(convertDbToCollection);
    return { data: collections, error: null };
  } catch (error) {
    console.error('Unexpected error fetching public collections:', error);
    return { data: [], error: error instanceof Error ? error.message : 'Unexpected error' };
  }
};
