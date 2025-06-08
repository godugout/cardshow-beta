
import { DesignMetadata, MarketMetadata } from '@/lib/types/cardTypes';

export const DEFAULT_MARKET_METADATA: MarketMetadata = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: false,
  price: 0,
  currency: 'USD',
  availableForSale: false,
  editionSize: 0,
  editionNumber: 0
};

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: {
    template: 'classic',
    effect: 'none',
    borderRadius: '8px',
    borderColor: '#000000',
    frameColor: '#000000',
    frameWidth: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  textStyle: {
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
  marketMetadata: DEFAULT_MARKET_METADATA
};
