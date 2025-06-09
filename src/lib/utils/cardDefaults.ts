
import { Card } from '@/lib/types/unifiedCardTypes';

export const DEFAULT_DESIGN_METADATA = {
  cardStyle: {
    template: 'classic',
    effect: 'none',
    borderRadius: '8px',
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0,0,0,0.2)',
    frameWidth: 2,
    frameColor: '#000000',
  },
  textStyle: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#000000',
    titleColor: '#000000',
    titleAlignment: 'center',
    titleWeight: 'bold',
    descriptionColor: '#333333',
  },
  cardMetadata: {
    category: 'general',
    series: 'base',
    cardType: 'standard',
  },
  marketMetadata: {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: false,
    price: 0,
    currency: 'USD',
    availableForSale: false,
    editionSize: 1,
    editionNumber: 1,
  }
};

export const DEFAULT_MARKET_METADATA = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: false,
  price: 0,
  currency: 'USD',
  availableForSale: false,
  editionSize: 1,
  editionNumber: 1,
};

export const createBlankCard = (userId: string): Partial<Card> => {
  return {
    title: '',
    description: '',
    imageUrl: '',
    thumbnailUrl: '',
    tags: [],
    userId,
    effects: [],
    designMetadata: DEFAULT_DESIGN_METADATA,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
