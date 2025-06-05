
import { CardStyle, TextStyle, MarketMetadata, CardMetadata, DesignMetadata } from '@/lib/types/cardTypes';

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'classic',
  effect: 'none',
  borderRadius: '8px',
  borderWidth: 2,
  borderColor: '#000000',
  backgroundColor: '#FFFFFF',
  shadowColor: 'rgba(0,0,0,0.2)',
  frameWidth: 2,
  frameColor: '#000000',
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  titleFont: 'Inter',
  titleSize: '24px',
  titleColor: '#000000',
  titleAlignment: 'center',
  titleWeight: 'bold',
  descriptionFont: 'Inter',
  descriptionSize: '14px',
  descriptionColor: '#666666',
};

export const DEFAULT_MARKET_METADATA: MarketMetadata = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: false,
  price: 0,
  currency: 'USD',
  availableForSale: false,
  editionSize: 1,
  editionNumber: 1
};

export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'general',
  series: 'base',
  cardType: 'standard',
};

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  cardMetadata: DEFAULT_CARD_METADATA,
  marketMetadata: DEFAULT_MARKET_METADATA,
};
