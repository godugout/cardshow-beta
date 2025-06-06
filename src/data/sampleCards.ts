
import { Card } from '@/lib/types/cardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export const sampleCards: Card[] = [
  {
    id: 'sample-card-1',
    title: 'Baseball Star Rookie Card',
    description: 'A stunning rookie card featuring detailed stats and premium design.',
    imageUrl: '/lovable-uploads/667e6ad2-af96-40ac-bd16-a69778e14b21.png',
    thumbnailUrl: '/lovable-uploads/667e6ad2-af96-40ac-bd16-a69778e14b21.png',
    tags: ['baseball', 'rookie', 'premium'],
    userId: 'user-1',
    effects: ['holographic'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    player: 'Mike Rodriguez',
    team: 'Oakland Athletics',
    position: 'Pitcher',
    year: '2024',
    designMetadata: DEFAULT_DESIGN_METADATA,
  },
  {
    id: 'sample-card-2',
    title: 'Basketball Legend Card',
    description: 'Featuring career highlights and championship moments.',
    imageUrl: '/lovable-uploads/88d804c5-6d0c-402e-b2d6-f0d10b5f6699.png',
    thumbnailUrl: '/lovable-uploads/88d804c5-6d0c-402e-b2d6-f0d10b5f6699.png',
    tags: ['basketball', 'legend', 'championship'],
    userId: 'user-1',
    effects: ['prismatic'],
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    player: 'Sarah Johnson',
    team: 'Golden State Warriors',
    position: 'Point Guard',
    year: '2023',
    designMetadata: DEFAULT_DESIGN_METADATA,
  },
  {
    id: 'sample-card-3',
    title: 'Football Hero Card',
    description: 'Dynamic action shot with season statistics.',
    imageUrl: '/lovable-uploads/93353027-d213-4314-8ab9-0d38bb552e8a.png',
    thumbnailUrl: '/lovable-uploads/93353027-d213-4314-8ab9-0d38bb552e8a.png',
    tags: ['football', 'action', 'stats'],
    userId: 'user-1',
    effects: ['metallic'],
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
    player: 'David Thompson',
    team: 'San Francisco 49ers',
    position: 'Quarterback',
    year: '2024',
    designMetadata: DEFAULT_DESIGN_METADATA,
  }
];
