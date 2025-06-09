
import { Card as CoreCard, CardEffect } from '@/lib/types/core';
import { Card as UnifiedCard } from '@/lib/types/unifiedCardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

/**
 * Converts string effects to CardEffect objects
 */
export function convertEffectsToCardEffects(effects: string[] | CardEffect[]): CardEffect[] {
  if (!effects) return [];
  
  return effects.map((effect, index) => {
    if (typeof effect === 'string') {
      return {
        id: `effect-${index}-${Date.now()}`,
        type: effect as any,
        intensity: 1,
        parameters: {}
      };
    }
    return effect;
  });
}

/**
 * Adapts any card format to the core Card interface
 */
export function adaptToCard(card: any): CoreCard {
  return {
    id: card.id,
    title: card.title || 'Untitled Card',
    description: card.description || '',
    imageUrl: card.imageUrl || '',
    thumbnailUrl: card.thumbnailUrl || card.imageUrl || '',
    userId: card.userId || card.creator_id || 'unknown',
    tags: card.tags || [],
    effects: convertEffectsToCardEffects(card.effects || []),
    createdAt: card.createdAt || card.created_at || new Date().toISOString(),
    updatedAt: card.updatedAt || card.updated_at || new Date().toISOString(),
    designMetadata: card.designMetadata || DEFAULT_DESIGN_METADATA,
    rarity: card.rarity,
    isPublic: card.isPublic,
    collectionId: card.collectionId,
    teamId: card.teamId,
    verificationStatus: card.verificationStatus,
    price: card.price,
    editionSize: card.editionSize,
    printAvailable: card.printAvailable,
    artist: card.artist,
    year: card.year,
    set: card.set,
    player: card.player,
    team: card.team,
    reactions: card.reactions,
    name: card.name,
    jersey: card.jersey,
    cardType: card.cardType,
    cardNumber: card.cardNumber,
    backgroundColor: card.backgroundColor,
    specialEffect: card.specialEffect
  };
}

/**
 * Converts core Card to UnifiedCard format
 */
export function adaptToUnifiedCard(card: CoreCard): UnifiedCard {
  return {
    ...card,
    effects: card.effects.map(effect => effect.type) as any, // Convert back to string[] for unified format
    designMetadata: card.designMetadata as any || DEFAULT_DESIGN_METADATA
  };
}
