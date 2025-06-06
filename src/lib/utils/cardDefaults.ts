
import { DesignMetadata, CardStyle, TextStyle } from '@/lib/types/cardTypes';

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'classic',
  effect: 'none',
  borderRadius: '8px',
  borderColor: '#000000',
  frameColor: '#000000',
  frameWidth: 2,
  shadowColor: 'rgba(0,0,0,0.2)',
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  titleColor: '#000000',
  titleAlignment: 'center',
  titleWeight: 'bold',
  descriptionColor: '#333333',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontWeight: 'normal',
  color: '#000000'
};

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  marketMetadata: {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: false,
  },
  cardMetadata: {
    category: 'general',
    cardType: 'standard',
    series: 'base',
  },
};
