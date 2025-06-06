
import { Card } from '@/lib/types/cardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export const cardData: Card[] = [
  {
    id: '1',
    title: 'Sample Baseball Card',
    description: 'A sample baseball card for demonstration',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['baseball', 'sample'],
    userId: 'user1',
    effects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Sample Player',
    team: 'Sample Team',
    year: '2024',
    rarity: 'common'
  }
];

export default cardData;
