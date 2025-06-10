
import { convertEffectsToCardEffects } from '@/lib/adapters/cardAdapter';

export const sampleCards = [
  {
    id: 'sample-1',
    title: 'Vintage Baseball Card',
    description: 'A classic baseball card from the golden era',
    imageUrl: '/images/baseball-vintage.jpg',
    thumbnailUrl: '/images/baseball-vintage-thumb.jpg',
    tags: ['baseball', 'vintage', 'sports'],
    userId: 'user-1',
    effects: convertEffectsToCardEffects(['vintage', 'sepia']),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    designMetadata: {
      cardStyle: {},
      textStyle: {},
      cardMetadata: {},
      marketMetadata: { isPrintable: true, isForSale: false, includeInCatalog: true }
    }
  },
  {
    id: 'sample-2',
    title: 'Modern Football Card',
    description: 'Contemporary football trading card',
    imageUrl: '/images/football-modern.jpg',
    thumbnailUrl: '/images/football-modern-thumb.jpg',
    tags: ['football', 'modern', 'sports'],
    userId: 'user-1',
    effects: convertEffectsToCardEffects(['holographic']),
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    designMetadata: {
      cardStyle: {},
      textStyle: {},
      cardMetadata: {},
      marketMetadata: { isPrintable: true, isForSale: true, includeInCatalog: true }
    }
  },
  {
    id: 'sample-3',
    title: 'Basketball Legend',
    description: 'Legendary basketball player card',
    imageUrl: '/images/basketball-legend.jpg',
    thumbnailUrl: '/images/basketball-legend-thumb.jpg',
    tags: ['basketball', 'legend', 'sports'],
    userId: 'user-2',
    effects: convertEffectsToCardEffects(['prismatic', 'foil']),
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    designMetadata: {
      cardStyle: {},
      textStyle: {},
      cardMetadata: {},
      marketMetadata: { isPrintable: true, isForSale: false, includeInCatalog: true }
    }
  }
];
