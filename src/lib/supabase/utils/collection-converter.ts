
import { Collection } from '@/lib/types';

export function convertDbToCollection(data: any): Collection {
  return {
    id: data.id,
    name: data.title,
    description: data.description || '',
    coverImageUrl: data.cover_image_url,
    userId: data.owner_id,
    teamId: data.team_id,
    visibility: data.visibility,
    allowComments: data.allow_comments,
    isPublic: data.visibility === 'public',
    designMetadata: data.design_metadata,
    cards: [],
    cardIds: [],
    tags: data.tags || [],
    featured: data.featured || false,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export function convertCollectionToDb(collection: Partial<Collection>) {
  return {
    title: collection.name,
    description: collection.description,
    cover_image_url: collection.coverImageUrl,
    owner_id: collection.userId,
    team_id: collection.teamId,
    visibility: collection.visibility,
    allow_comments: collection.allowComments,
    design_metadata: collection.designMetadata,
    tags: collection.tags,
    featured: collection.featured,
  };
}
