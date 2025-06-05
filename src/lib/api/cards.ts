
import { Card } from '@/lib/types/cardTypes';
import { adaptToCard } from '@/lib/adapters/cardAdapter';

// Mock API functions for CardShow
export const fetchCards = async (): Promise<Card[]> => {
  // In a real app, would use fetch or axios to get from API
  return [
    adaptToCard({
      id: '1',
      title: 'Sample Card 1',
      description: 'Description for sample card 1',
      imageUrl: '/sample-card-1.jpg',
      thumbnailUrl: '/sample-card-1-thumb.jpg',
      tags: ['sample', 'card'],
      userId: 'user1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      effects: []
    }),
    adaptToCard({
      id: '2',
      title: 'Sample Card 2',
      description: 'Description for sample card 2',
      imageUrl: '/sample-card-2.jpg',
      thumbnailUrl: '/sample-card-2-thumb.jpg',
      tags: ['sample', 'card'],
      userId: 'user2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      effects: ['Holographic']
    }),
  ];
};

export const fetchCardById = async (id: string): Promise<Card | null> => {
  const cards = await fetchCards();
  return cards.find(card => card.id === id) || null;
};
