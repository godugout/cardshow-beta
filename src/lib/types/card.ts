
/**
 * @deprecated This file is maintained for backward compatibility.
 * Please use the centralized type definitions from src/lib/types/cardTypes.ts instead.
 */

// Re-export everything from cardTypes for backward compatibility
export type {
  Card,
  CardTemplate,
  CardStyle,
  TextStyle,
  FabricSwatch,
  DesignMetadata,
  MarketMetadata,
  CardMetadata,
  Reaction,
  Comment,
  CardRarity,
  CardEffect,
  CardEffectSettings,
  CardLayer,
  CardStats,
  HotspotData,
  OaklandMemoryData
} from './cardTypes';

// Helper function to convert between Card and CardData types
import { Card as CardType } from './cardTypes';
import { DEFAULT_DESIGN_METADATA } from '../utils/cardDefaults';
import { cardEffectsToStringArray } from '../utils/cardEffectHelpers';

export interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  userId: string;
  effects: string[]; // Keep as string[] for backward compatibility
  createdAt: string;
  updatedAt: string;
  backgroundColor?: string;
  name?: string;
  team?: string;
  jersey?: string;
  set?: string;
  year?: string;
  specialEffect?: string;
  cardType?: string;
  artist?: string;
  cardNumber?: string;
  designMetadata: {
    cardStyle: {
      template: string;
      effect: string;
      borderRadius: string;
      borderColor: string;
      frameColor: string;
      frameWidth: number;
      shadowColor: string;
    };
    textStyle: {
      titleColor: string;
      titleAlignment: string;
      titleWeight: string;
      descriptionColor: string;
    };
    cardMetadata: {
      category?: string;
      series?: string;
      cardType?: string;
    };
    marketMetadata: {
      isPrintable: boolean;
      isForSale: boolean;
      includeInCatalog: boolean;
      price?: number;
      currency?: string;
      availableForSale?: boolean;
      editionSize?: number;
      editionNumber?: number;
    };
  };
}

export function adaptCardToCardData(card: CardType): CardData {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    imageUrl: card.imageUrl,
    thumbnailUrl: card.thumbnailUrl,
    tags: card.tags,
    userId: card.userId,
    effects: cardEffectsToStringArray(card.effects), // Convert CardEffect[] to string[]
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    name: card.player || card.name,
    team: card.team,
    jersey: card.jersey,
    year: card.year,
    set: card.set,
    cardType: card.cardType,
    artist: card.artist,
    cardNumber: card.cardNumber,
    backgroundColor: card.backgroundColor,
    specialEffect: card.specialEffect,
    designMetadata: {
      cardStyle: {
        template: card.designMetadata.cardStyle.template || 'classic',
        effect: card.designMetadata.cardStyle.effect || 'none',
        borderRadius: card.designMetadata.cardStyle.borderRadius || '8px',
        borderColor: card.designMetadata.cardStyle.borderColor || '#000000',
        frameColor: card.designMetadata.cardStyle.frameColor || '#000000',
        frameWidth: card.designMetadata.cardStyle.frameWidth || 2,
        shadowColor: card.designMetadata.cardStyle.shadowColor || 'rgba(0,0,0,0.3)',
      },
      textStyle: {
        titleColor: card.designMetadata.textStyle.titleColor || '#000000',
        titleAlignment: card.designMetadata.textStyle.titleAlignment || 'center',
        titleWeight: card.designMetadata.textStyle.titleWeight || 'bold',
        descriptionColor: card.designMetadata.textStyle.descriptionColor || '#666666',
      },
      cardMetadata: card.designMetadata.cardMetadata,
      marketMetadata: card.designMetadata.marketMetadata
    }
  };
}
