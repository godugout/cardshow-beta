
import { Card } from '@/lib/types/cardTypes';

// Sample cards for development
export const sampleCards: Card[] = [
  {
    id: '1',
    title: 'Mike Trout 2023',
    description: 'Angels superstar outfielder',
    imageUrl: '/public/lovable-uploads/236e3ad9-f7c2-4e5b-b29a-ca52a49ff3ed.png',
    thumbnailUrl: '/public/lovable-uploads/236e3ad9-f7c2-4e5b-b29a-ca52a49ff3ed.png',
    tags: ['baseball', 'angels', 'outfield'],
    userId: 'user1',
    effects: ['holographic'],
    player: 'Mike Trout',
    team: 'Los Angeles Angels',
    year: '2023',
    jersey: '27',
    rarity: 'ultra-rare',
    designMetadata: {
      cardStyle: {
        template: 'modern',
        effect: 'holographic',
        borderRadius: '12px',
        borderWidth: 2,
        borderColor: '#ff6b35',
        frameColor: '#ff6b35',
        frameWidth: 3,
        shadowColor: 'rgba(255, 107, 53, 0.3)',
        backgroundColor: '#fff5f2'
      },
      textStyle: {
        titleColor: '#2d3748',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#4a5568'
      },
      cardMetadata: {
        category: 'sports',
        series: 'flagship',
        cardType: 'rookie'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: false,
        includeInCatalog: true
      }
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Shohei Ohtani 2023',
    description: 'Two-way phenom',
    imageUrl: '/public/lovable-uploads/371b81a2-cafa-4637-9358-218d4120c658.png',
    thumbnailUrl: '/public/lovable-uploads/371b81a2-cafa-4637-9358-218d4120c658.png',
    tags: ['baseball', 'angels', 'pitcher', 'dh'],
    userId: 'user1',
    effects: ['prismatic', 'chrome'],
    player: 'Shohei Ohtani',
    team: 'Los Angeles Angels',
    year: '2023',
    jersey: '17',
    rarity: 'legendary',
    designMetadata: {
      cardStyle: {
        template: 'premium',
        effect: 'prismatic',
        borderRadius: '16px',
        borderWidth: 2,
        borderColor: '#8b5cf6',
        frameColor: '#8b5cf6',
        frameWidth: 2,
        shadowColor: 'rgba(139, 92, 246, 0.4)',
        backgroundColor: '#faf5ff'
      },
      textStyle: {
        titleColor: '#1a202c',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#2d3748'
      },
      cardMetadata: {
        category: 'sports',
        series: 'premium',
        cardType: 'special'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: true,
        includeInCatalog: true,
        price: 299.99
      }
    },
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Fernando Tatis Jr. 2023',
    description: 'Padres superstar shortstop',
    imageUrl: '/public/lovable-uploads/79a099b9-c77a-491e-9755-ba25419791f5.png',
    thumbnailUrl: '/public/lovable-uploads/79a099b9-c77a-491e-9755-ba25419791f5.png',
    tags: ['baseball', 'padres', 'shortstop'],
    userId: 'user2',
    effects: ['shine', 'gold-accent'],
    player: 'Fernando Tatis Jr.',
    team: 'San Diego Padres',
    year: '2023',
    jersey: '23',
    rarity: 'rare',
    designMetadata: {
      cardStyle: {
        template: 'vintage',
        effect: 'shine',
        borderRadius: '8px',
        borderWidth: 2,
        borderColor: '#d69e2e',
        frameColor: '#d69e2e',
        frameWidth: 4,
        shadowColor: 'rgba(214, 158, 46, 0.3)',
        backgroundColor: '#fffff0'
      },
      textStyle: {
        titleColor: '#4a5568',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#718096'
      },
      cardMetadata: {
        category: 'sports',
        series: 'throwback',
        cardType: 'all-star'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: false,
        includeInCatalog: true
      }
    },
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Ronald Acuña Jr. 2023',
    description: 'Braves outfielder and power hitter',
    imageUrl: '/public/lovable-uploads/83c68cf9-abc8-4102-954e-6061d2bc86c5.png',
    thumbnailUrl: '/public/lovable-uploads/83c68cf9-abc8-4102-954e-6061d2bc86c5.png',
    tags: ['baseball', 'braves', 'outfield', 'power'],
    userId: 'user2',
    effects: ['holographic', 'glow'],
    player: 'Ronald Acuña Jr.',
    team: 'Atlanta Braves',
    year: '2023',
    jersey: '13',
    rarity: 'ultra-rare',
    designMetadata: {
      cardStyle: {
        template: 'modern',
        effect: 'holographic',
        borderRadius: '12px',
        borderWidth: 2,
        borderColor: '#4299e1',
        frameColor: '#4299e1',
        frameWidth: 3,
        shadowColor: 'rgba(66, 153, 225, 0.4)',
        backgroundColor: '#edf2f7'
      },
      textStyle: {
        titleColor: '#2d3748',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#4a5568'
      },
      cardMetadata: {
        category: 'sports',
        series: 'flagship',
        cardType: 'mvp'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: true,
        includeInCatalog: true,
        price: 349.99
      }
    },
    createdAt: '2023-01-04T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'Juan Soto 2023',
    description: 'Yankees outfielder and batting champion',
    imageUrl: '/public/lovable-uploads/a5a9b8c7-b2a1-4f7d-b8a3-8e1a2b3c4a5f.png',
    thumbnailUrl: '/public/lovable-uploads/a5a9b8c7-b2a1-4f7d-b8a3-8e1a2b3c4a5f.png',
    tags: ['baseball', 'yankees', 'outfield', 'batting'],
    userId: 'user3',
    effects: ['shine', 'chrome'],
    player: 'Juan Soto',
    team: 'New York Yankees',
    year: '2023',
    jersey: '22',
    rarity: 'rare',
    designMetadata: {
      cardStyle: {
        template: 'modern',
        effect: 'chrome',
        borderRadius: '12px',
        borderWidth: 2,
        borderColor: '#003087',
        frameColor: '#003087',
        frameWidth: 3,
        shadowColor: 'rgba(0, 48, 135, 0.4)',
        backgroundColor: '#f0f4ff'
      },
      textStyle: {
        titleColor: '#e2e8f0',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#a3b18a'
      },
      cardMetadata: {
        category: 'sports',
        series: 'limited edition',
        cardType: 'batting champion'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: false,
        includeInCatalog: true
      }
    },
    createdAt: '2023-01-05T00:00:00Z',
    updatedAt: '2023-01-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'Mookie Betts 2023',
    description: 'Dodgers outfielder and all-star',
    imageUrl: '/public/lovable-uploads/b9c8d7e6-a3b2-4f1a-b8d9-c7e6f5a2b3d4.png',
    thumbnailUrl: '/public/lovable-uploads/b9c8d7e6-a3b2-4f1a-b8d9-c7e6f5a2b3d4.png',
    tags: ['baseball', 'dodgers', 'outfield', 'all-star'],
    userId: 'user3',
    effects: ['holographic', 'gold-accent'],
    player: 'Mookie Betts',
    team: 'Los Angeles Dodgers',
    year: '2023',
    jersey: '50',
    rarity: 'legendary',
    designMetadata: {
      cardStyle: {
        template: 'premium',
        effect: 'holographic',
        borderRadius: '16px',
        borderWidth: 2,
        borderColor: '#a5d8ff',
        frameColor: '#a5d8ff',
        frameWidth: 2,
        shadowColor: 'rgba(165, 216, 255, 0.4)',
        backgroundColor: '#e6f7ff'
      },
      textStyle: {
        titleColor: '#1e3a8a',
        titleAlignment: 'center',
        titleWeight: 'bold',
        descriptionColor: '#3b82f6'
      },
      cardMetadata: {
        category: 'sports',
        series: 'all-star',
        cardType: 'special edition'
      },
      marketMetadata: {
        isPrintable: true,
        isForSale: true,
        includeInCatalog: true,
        price: 499.99
      }
    },
    createdAt: '2023-01-06T00:00:00Z',
    updatedAt: '2023-01-06T00:00:00Z'
  }
];

// Export cardData for backward compatibility
export const cardData = sampleCards;

// Export default for backward compatibility
export default sampleCards;
