
import { supabase } from './client';
import type { Collection } from '@/lib/types';
import { convertDbToCollection, convertCollectionToDb } from './utils/collection-converter';

export const createCollection = async (collectionData: Partial<Collection>) => {
  try {
    const collectionToDb = convertCollectionToDb(collectionData);
    const { data, error } = await supabase
      .from('collections')
      .insert([collectionToDb])
      .select()
      .single();

    if (error) {
      console.error('Error creating collection:', error);
      return { data: null, error: error.message };
    }

    return { data: convertDbToCollection(data), error: null };
  } catch (error: any) {
    console.error('Error creating collection:', error);
    return { data: null, error: error.message };
  }
};

export const getUserCollections = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user collections:', error);
      return { data: null, error: error.message };
    }

    const collections = data.map(convertDbToCollection);
    return { data: collections, error: null };
  } catch (error: any) {
    console.error('Error fetching user collections:', error);
    return { data: null, error: error.message };
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
      return { data: null, error: error.message };
    }

    const collections = data.map(convertDbToCollection);
    return { data: collections, error: null };
  } catch (error: any) {
    console.error('Error fetching public collections:', error);
    return { data: null, error: error.message };
  }
};

export const updateCollection = async (collectionId: string, updates: Partial<Collection>) => {
  try {
    const collectionToDb = convertCollectionToDb(updates);
    const { data, error } = await supabase
      .from('collections')
      .update(collectionToDb)
      .eq('id', collectionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating collection:', error);
      return { data: null, error: error.message };
    }

    return { data: convertDbToCollection(data), error: null };
  } catch (error: any) {
    console.error('Error updating collection:', error);
    return { data: null, error: error.message };
  }
};

export const deleteCollection = async (collectionId: string) => {
  try {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', collectionId);

    if (error) {
      console.error('Error deleting collection:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: any) {
    console.error('Error deleting collection:', error);
    return { error: error.message };
  }
};

export const checkCollectionExists = async (name: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('id')
      .eq('title', name)
      .eq('owner_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking collection exists:', error);
      return { exists: false, error: error.message };
    }

    return { exists: !!data, error: null };
  } catch (error: any) {
    console.error('Error checking collection exists:', error);
    return { exists: false, error: error.message };
  }
};

export const collectionOperations = {
  create: createCollection,
  getUserCollections,
  getPublic: getPublicCollections,
  update: updateCollection,
  delete: deleteCollection,
  checkExists: checkCollectionExists
};
