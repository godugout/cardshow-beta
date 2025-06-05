
import { CardData } from '@/types/card';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export const sampleCards: CardData[] = [
  {
    id: '1',
    title: 'Mike Trout 2023',
    description: 'Los Angeles Angels centerfielder and three-time AL MVP',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'angels', 'mvp'],
    userId: 'user1',
    effects: ['holographic'],
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
    name: 'Mike Trout',
    team: 'Los Angeles Angels',
    jersey: '27',
    year: '2023',
    set: 'Topps Series 1',
    cardNumber: '1',
    cardType: 'Base',
    artist: 'Topps Design Team',
    backgroundColor: '#FF6B35',
    textColor: '#FFFFFF',
    specialEffect: 'holographic',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#FF6B35',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  },
  {
    id: '2',
    title: 'Shohei Ohtani 2023',
    description: 'Los Angeles Angels two-way superstar',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'angels', 'pitcher', 'dh'],
    userId: 'user1',
    effects: ['prismatic'],
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
    name: 'Shohei Ohtani',
    team: 'Los Angeles Angels',
    jersey: '17',
    year: '2023',
    set: 'Topps Chrome',
    cardNumber: '50',
    cardType: 'Refractor',
    artist: 'Topps Chrome Team',
    backgroundColor: '#4A90E2',
    textColor: '#FFFFFF',
    specialEffect: 'prismatic',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#4A90E2',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  },
  {
    id: '3',
    title: 'Ronald Acuña Jr. 2023',
    description: 'Atlanta Braves outfielder and NL MVP',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'braves', 'mvp'],
    userId: 'user2',
    effects: ['gold-foil'],
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z',
    name: 'Ronald Acuña Jr.',
    team: 'Atlanta Braves',
    jersey: '13',
    year: '2023',
    set: 'Topps Update',
    cardNumber: '100',
    cardType: 'Gold Parallel',
    artist: 'Topps Artist',
    backgroundColor: '#FFD700',
    textColor: '#000000',
    specialEffect: 'gold-foil',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#FFD700',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  },
  {
    id: '4',
    title: 'Mookie Betts 2023',
    description: 'Los Angeles Dodgers right fielder',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'dodgers', 'outfield'],
    userId: 'user2',
    effects: ['metallic'],
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z',
    name: 'Mookie Betts',
    team: 'Los Angeles Dodgers',
    jersey: '50',
    year: '2023',
    set: 'Bowman Chrome',
    cardNumber: '25',
    cardType: 'Prospect',
    artist: 'Bowman Team',
    backgroundColor: '#1E3A8A',
    textColor: '#FFFFFF',
    specialEffect: 'metallic',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#1E3A8A',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  },
  {
    id: '5',
    title: 'Francisco Lindor 2023',
    description: 'New York Mets shortstop',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'mets', 'shortstop'],
    userId: 'user3',
    effects: ['refractor'],
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
    name: 'Francisco Lindor',
    team: 'New York Mets',
    jersey: '12',
    year: '2023',
    set: 'Panini Prizm',
    cardNumber: '75',
    cardType: 'Silver Prizm',
    artist: 'Panini Design',
    backgroundColor: '#FF6900',
    textColor: '#FFFFFF',
    specialEffect: 'refractor',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#FF6900',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  },
  {
    id: '6',
    title: 'Juan Soto 2023',
    description: 'San Diego Padres outfielder',
    imageUrl: '/placeholder-card.png',
    thumbnailUrl: '/placeholder-card.png',
    tags: ['baseball', 'padres', 'outfield'],
    userId: 'user3',
    effects: ['vintage'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
    name: 'Juan Soto',
    team: 'San Diego Padres',
    jersey: '22',
    year: '2023',
    set: 'Topps Heritage',
    cardNumber: '200',
    cardType: 'High Number',
    artist: 'Heritage Team',
    backgroundColor: '#8B4513',
    textColor: '#FFFFFF',
    specialEffect: 'vintage',
    designMetadata: {
      cardStyle: {
        ...DEFAULT_DESIGN_METADATA.cardStyle,
        backgroundColor: '#8B4513',
        borderWidth: 2
      },
      textStyle: DEFAULT_DESIGN_METADATA.textStyle,
      cardMetadata: DEFAULT_DESIGN_METADATA.cardMetadata,
      marketMetadata: DEFAULT_DESIGN_METADATA.marketMetadata
    }
  }
];

// Export cardData for backward compatibility
export const cardData = sampleCards;
