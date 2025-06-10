
import { DesignMetadata, CardStyle, TextStyle, CardMetadata, MarketMetadata } from '@/lib/types/core';

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'classic',
  effect: 'none',
  borderRadius: '8px',
  borderWidth: 2,
  borderColor: '#d1d5db',
  backgroundColor: '#ffffff',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  frameWidth: 0,
  frameColor: '#000000'
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: 'Inter',
  fontSize: '16px',
  fontWeight: 'normal',
  color: '#1f2937',
  titleColor: '#111827',
  titleAlignment: 'center',
  titleWeight: 'bold',
  descriptionColor: '#6b7280'
};

export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'general',
  series: 'custom',
  cardType: 'standard',
  effects: []
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

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  cardMetadata: DEFAULT_CARD_METADATA,
  marketMetadata: DEFAULT_MARKET_METADATA
};
