import { Card } from '@/lib/types/unifiedCardTypes';

// Reliable images from Unsplash
const RELIABLE_IMAGES = {
  basketball: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1000',
  football: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000',
  baseball: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000',
  anime: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000',
  vintage: 'https://images.unsplash.com/photo-1637666589313-f22b900e9c2d?q=80&w=1000',
  pokemon: 'https://images.unsplash.com/photo-1613771404273-1bound29e8d20?q=80&w=1000',
  default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000'
};

// Create a base design metadata with all required fields
const createDesignMetadata = (borderColor: string, frameColor: string) => ({
  cardStyle: {
    template: 'classic',
    effect: 'classic',
    borderRadius: '8px',
    borderColor,
    frameColor,
    frameWidth: 3,
    shadowColor: `rgba(${parseInt(borderColor.slice(1, 3), 16)}, ${parseInt(borderColor.slice(3, 5), 16)}, ${parseInt(borderColor.slice(5, 7), 16)}, 0.5)`,
  },
  textStyle: {
    titleColor: '#FFFFFF',
    titleAlignment: 'left',
    titleWeight: 'bold',
    descriptionColor: '#FFFFFF',
  },
  cardMetadata: {
    category: 'sports',
    cardType: 'collectible',
    series: 'standard'
  },
  marketMetadata: {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: true
  }
});

export const sampleCards: Card[] = [
  {
    id: '1',
    title: 'Ken Griffey Jr. - 1989 Upper Deck',
    description: 'Rookie card of one of the greatest players of all time.',
    imageUrl: '/lovable-uploads/f07b9e90-98ec-4e0c-bca4-71acd9ae9924.png',
    thumbnailUrl: '/lovable-uploads/f07b9e90-98ec-4e0c-bca4-71acd9ae9924.png',
    tags: ['rookie', 'hall-of-fame', 'mariners'],
    userId: 'system',
    effects: ['holographic'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    designMetadata: {
      cardStyle: {
        template: 'classic',
        effect: 'holographic',
        borderRadius: '8px',
        borderColor: '#d4af37',
        frameColor: '#d4af37',
        frameWidth: 2,
        shadowColor: 'rgba(212, 175, 55, 0.3)',
      },
      textStyle: {
        titleColor: '#1a202c',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#4a5568',
      },
      cardMetadata: {
        category: 'sports',
        series: 'upper-deck-1989',
        cardType: 'rookie',
        cardNumber: '1',
        artist: 'Upper Deck',
        rarity: 'legendary'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: false,
        includeInCatalog: true,
        price: 299.99,
        currency: 'USD',
        availableForSale: false,
        editionSize: 1000,
        editionNumber: 1
      }
    }
  },
  {
    id: '2',
    title: 'Tony Gwynn - 1984 Donruss',
    description: 'Iconic card from Mr. Padre\'s championship season.',
    imageUrl: '/lovable-uploads/79a099b9-c77a-491e-9755-ba25419791f5.png',
    thumbnailUrl: '/lovable-uploads/79a099b9-c77a-491e-9755-ba25419791f5.png',
    tags: ['hall-of-fame', 'padres', 'batting-champion'],
    userId: 'system',
    effects: ['chrome'],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    designMetadata: {
      cardStyle: {
        template: 'vintage',
        effect: 'chrome',
        borderRadius: '12px',
        borderColor: '#a0522d',
        frameColor: '#a0522d',
        frameWidth: 3,
        shadowColor: 'rgba(160, 82, 45, 0.4)',
      },
      textStyle: {
        titleColor: '#8b4513',
        titleAlignment: 'left',
        titleWeight: 'bold',
        descriptionColor: '#654321',
      },
      cardMetadata: {
        category: 'sports',
        series: 'donruss-1984',
        cardType: 'star',
        cardNumber: '324',
        artist: 'Donruss',
        rarity: 'rare'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: true,
        includeInCatalog: true,
        price: 89.99,
        currency: 'USD',
        availableForSale: true,
        editionSize: 500,
        editionNumber: 87
      }
    }
  },
  {
    id: 'card-001',
    title: 'Basketball Legend',
    description: 'Limited edition collectible card featuring the basketball legend in action.',
    imageUrl: RELIABLE_IMAGES.basketball,
    thumbnailUrl: RELIABLE_IMAGES.basketball,
    tags: ['basketball', 'sports', 'collectible', 'legend'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-001',
    collectionId: 'collection-001',
    isPublic: true,
    designMetadata: createDesignMetadata('#f43f5e', '#f43f5e'),
    effects: ['Holographic', 'Refractor']
  },
  {
    id: 'card-002',
    title: 'Football Star Rookie',
    description: 'Rookie card of the football sensation that took the league by storm.',
    imageUrl: RELIABLE_IMAGES.football,
    thumbnailUrl: RELIABLE_IMAGES.football,
    tags: ['football', 'rookie', 'sports', 'star'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-001',
    collectionId: 'collection-001',
    isPublic: true,
    designMetadata: createDesignMetadata('#a855f7', '#a855f7'),
    effects: ['Chrome', 'Shimmer']
  },
  {
    id: 'card-003',
    title: 'Baseball Classic',
    description: 'Vintage baseball card featuring a legendary pitcher from the golden era.',
    imageUrl: RELIABLE_IMAGES.baseball,
    thumbnailUrl: RELIABLE_IMAGES.baseball,
    tags: ['baseball', 'vintage', 'pitcher', 'classic'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-002',
    collectionId: 'collection-002',
    isPublic: true,
    designMetadata: createDesignMetadata('#22c55e', '#22c55e'),
    effects: ['Vintage']
  },
  {
    id: 'card-004',
    title: 'Anime Collector Series',
    description: 'Special edition anime-inspired trading card with holographic finish.',
    imageUrl: RELIABLE_IMAGES.anime,
    thumbnailUrl: RELIABLE_IMAGES.anime,
    tags: ['anime', 'collector', 'special', 'holographic'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-002',
    collectionId: 'collection-002',
    isPublic: true,
    designMetadata: createDesignMetadata('#0ea5e9', '#0ea5e9'),
    effects: ['Holographic', 'Gold']
  },
  {
    id: 'card-005',
    title: 'Pokémon Tribute',
    description: 'Fan-made tribute to the classic Pokémon trading card game.',
    imageUrl: RELIABLE_IMAGES.pokemon,
    thumbnailUrl: RELIABLE_IMAGES.pokemon,
    tags: ['pokemon', 'tribute', 'fan-art', 'tcg'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-003',
    collectionId: 'collection-003',
    isPublic: true,
    designMetadata: createDesignMetadata('#fbbf24', '#fbbf24'),
    effects: ['Refractor', 'Shimmer']
  },
  {
    id: 'card-006',
    title: 'Vintage Collectible',
    description: 'Rare vintage trading card from the early days of card collecting.',
    imageUrl: RELIABLE_IMAGES.vintage,
    thumbnailUrl: RELIABLE_IMAGES.vintage,
    tags: ['vintage', 'rare', 'collectible', 'antique'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    teamId: 'team-003',
    collectionId: 'collection-003',
    isPublic: true,
    designMetadata: createDesignMetadata('#92400e', '#92400e'),
    effects: ['Vintage', 'Gold']
  }
];

export default sampleCards;
