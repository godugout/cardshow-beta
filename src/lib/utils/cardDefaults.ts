import { CardStyle, TextStyle, MarketMetadata, CardMetadata, DesignMetadata } from '@/lib/types/cardTypes';

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'classic',
  effect: 'none',
  borderRadius: '8px',
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
  titleWeight: 'bold', // Added titleWeight
  descriptionFont: 'Inter',
  descriptionSize: '14px',
  descriptionColor: '#666666',
};
