
import { DesignMetadata, MarketMetadata, Card } from '@/lib/types/core';
import { stringToCardEffect } from './cardEffectHelpers';

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: {
    template: 'classic',
    effect: 'none',
    borderRadius: '8px',
    borderColor: '#000000',
    frameColor: '#000000',
    frameWidth: 2,
    shadowColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#ffffff'
  },
  textStyle: {
    titleColor: '#000000',
    titleAlignment: 'center',
    titleWeight: 'bold',
    descriptionColor: '#666666',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif'
  },
  cardMetadata: {
    artist: '',
    year: '',
    set: '',
    rarity: 'common',
    category: 'trading',
    cardType: 'standard'
  },
  marketMetadata: {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: true,
    price: 0,
    currency: 'USD',
    availableForSale: false,
    editionSize: 1,
    editionNumber: 1
  }
};

export const DEFAULT_MARKET_METADATA: MarketMetadata = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: true,
  price: 0,
  currency: 'USD',
  availableForSale: false,
  editionSize: 1,
  editionNumber: 1
};

export const createBlankCard = (): Partial<Card> => ({
  title: '',
  description: '',
  imageUrl: '',
  thumbnailUrl: '',
  tags: [],
  effects: [],
  designMetadata: DEFAULT_DESIGN_METADATA
});
