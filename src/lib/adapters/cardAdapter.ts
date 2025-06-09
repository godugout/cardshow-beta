
import { UnifiedCard } from '@/lib/types/unifiedCardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export interface CardInput {
  id: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  tags?: string[];
  userId: string;
  effects?: string[];
  createdAt: string;
  updatedAt: string;
  collectionId?: string | null;
  [key: string]: any;
}

export function adaptToCard(input: CardInput): UnifiedCard {
  return {
    id: input.id,
    title: input.title,
    description: input.description || '',
    imageUrl: input.imageUrl,
    thumbnailUrl: input.thumbnailUrl || input.imageUrl,
    tags: input.tags || [],
    userId: input.userId,
    effects: input.effects || [],
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    designMetadata: input.designMetadata || DEFAULT_DESIGN_METADATA,
    
    // Extended properties
    name: input.name,
    player: input.player,
    team: input.team,
    year: input.year,
    cardNumber: input.cardNumber,
    set: input.set,
    cardType: input.cardType,
    artist: input.artist,
    backgroundColor: input.backgroundColor,
    specialEffect: input.specialEffect,
    collectionId: input.collectionId,
    price: input.price,
    rarity: input.rarity,
    verification_status: input.verification_status,
    jersey: input.jersey,
    stats: input.stats,
  };
}

// Legacy adapter for backwards compatibility
export function adaptToLegacyCard(input: Partial<UnifiedCard>): UnifiedCard {
  return {
    id: input.id || '',
    title: input.title || '',
    description: input.description || '',
    imageUrl: input.imageUrl || '',
    thumbnailUrl: input.thumbnailUrl || input.imageUrl || '',
    tags: input.tags || [],
    userId: input.userId || '',
    effects: input.effects || [],
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString(),
    designMetadata: input.designMetadata || DEFAULT_DESIGN_METADATA,
    
    // Extended properties with defaults
    name: input.name,
    player: input.player,
    team: input.team,
    year: input.year,
    cardNumber: input.cardNumber,
    set: input.set,
    cardType: input.cardType,
    artist: input.artist,
    backgroundColor: input.backgroundColor,
    specialEffect: input.specialEffect,
    collectionId: input.collectionId,
    price: input.price,
    rarity: input.rarity,
    verification_status: input.verification_status,
    jersey: input.jersey,
    stats: input.stats,
  };
}
