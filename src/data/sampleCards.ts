
import { Card, DEFAULT_DESIGN_METADATA } from '@/lib/types/cardTypes';

export const sampleCards: Card[] = [
  {
    id: 'card-001',
    title: 'Stephen Curry - Golden State Warriors',
    description: 'NBA Champion and three-point record holder',
    imageUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    thumbnailUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    tags: ['basketball', 'nba', 'warriors'],
    userId: 'user-001',
    effects: [],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    player: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'Point Guard',
    year: '2024',
    designMetadata: DEFAULT_DESIGN_METADATA
  },
  {
    id: 'card-002',
    title: 'LeBron James - Los Angeles Lakers',
    description: 'Four-time NBA champion and all-time scoring leader',
    imageUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    thumbnailUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    tags: ['basketball', 'nba', 'Lakers'],
    userId: 'user-001',
    effects: [],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    player: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'Small Forward',
    year: '2024',
    designMetadata: DEFAULT_DESIGN_METADATA
  },
  {
    id: 'card-003',
    title: 'Giannis Antetokounmpo - Milwaukee Bucks',
    description: 'Two-time MVP and NBA Champion',
    imageUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    thumbnailUrl: '/lovable-uploads/fa55173e-d864-41b2-865d-144d94507dc1.png',
    tags: ['basketball', 'nba', 'bucks'],
    userId: 'user-001',
    effects: [],
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    player: 'Giannis Antetokounmpo',
    team: 'Milwaukee Bucks',
    position: 'Power Forward',
    year: '2024',
    designMetadata: DEFAULT_DESIGN_METADATA
  }
];
