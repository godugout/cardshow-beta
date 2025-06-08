
import { Card, DesignMetadata } from '@/lib/types/unifiedCardTypes';
import { DEFAULT_DESIGN_METADATA, createBlankCard } from '@/lib/utils/cardDefaults';

export const adaptToCard = (data: any): Card => {
  return {
    id: data.id || '',
    title: data.title || '',
    description: data.description || '',
    imageUrl: data.imageUrl || '',
    thumbnailUrl: data.thumbnailUrl || data.imageUrl || '',
    tags: data.tags || [],
    userId: data.userId || '',
    effects: data.effects || [],
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    designMetadata: data.designMetadata || DEFAULT_DESIGN_METADATA,
    
    // Optional fields
    player: data.player,
    team: data.team,
    year: data.year,
    cardNumber: data.cardNumber,
    set: data.set,
    cardType: data.cardType,
    artist: data.artist,
    backgroundColor: data.backgroundColor,
    specialEffect: data.specialEffect,
    collectionId: data.collectionId,
    price: data.price,
    rarity: data.rarity,
    verification_status: data.verification_status,
    stats: data.stats,
  };
};

export { createBlankCard };
