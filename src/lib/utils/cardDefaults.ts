
import { DesignMetadata, CardStyle, TextStyle, CardMetadata, MarketMetadata, UnifiedCard } from '@/lib/types/unifiedCardTypes';

export const DEFAULT_CARD_STYLE: CardStyle = {
  template: 'standard',
  effect: 'none',
  borderRadius: '8px',
  borderColor: '#000000',
  shadowColor: '#000000',
  frameWidth: 2,
  frameColor: '#FFFFFF'
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
  titleColor: '#FFFFFF',
  titleAlignment: 'center',
  titleWeight: 'bold',
  descriptionColor: '#CCCCCC'
};

export const DEFAULT_CARD_METADATA: CardMetadata = {
  category: 'standard',
  series: 'base',
  cardType: 'player',
  rarity: 'common'
};

export const DEFAULT_MARKET_METADATA: MarketMetadata = {
  isPrintable: false,
  isForSale: false,
  includeInCatalog: true
};

export const DEFAULT_DESIGN_METADATA: DesignMetadata = {
  cardStyle: DEFAULT_CARD_STYLE,
  textStyle: DEFAULT_TEXT_STYLE,
  cardMetadata: DEFAULT_CARD_METADATA,
  marketMetadata: DEFAULT_MARKET_METADATA
};

export const createDefaultCard = (overrides: Partial<UnifiedCard> = {}): UnifiedCard => {
  return {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    thumbnailUrl: '',
    tags: [],
    userId: '',
    effects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    ...overrides
  };
};
