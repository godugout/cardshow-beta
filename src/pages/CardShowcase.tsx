import React from 'react';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';
import type { Card } from '@/lib/types/unifiedCardTypes';

const showcaseCards: Card[] = [
  {
    id: 'showcase-1',
    title: 'Legendary Hero',
    description: 'A powerful warrior from ancient times',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['legendary', 'warrior'],
    userId: 'showcase-user',
    effects: ['holographic'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Hero Name',
    team: 'Ancient Warriors',
    year: '2024'
  },
  {
    id: 'showcase-2',
    title: 'Futuristic Cityscape',
    description: 'A vibrant metropolis of the future',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['futuristic', 'cityscape'],
    userId: 'showcase-user',
    effects: ['chrome'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'City Name',
    team: 'Future Dwellers',
    year: '2222'
  },
  {
    id: 'showcase-3',
    title: 'Mystical Forest',
    description: 'An enchanted woodland with hidden secrets',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['mystical', 'forest'],
    userId: 'showcase-user',
    effects: ['vintage'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Forest Spirit',
    team: 'Guardians of the Wood',
    year: 'Ancient'
  }
];

const CardShowcase: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Card Showcase</h1>
        <p className="text-muted-foreground">Discover amazing card designs and effects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcaseCards.map((card) => (
          <div key={card.id} className="group cursor-pointer">
            <div className="aspect-[2.5/3.5] relative overflow-hidden rounded-lg bg-gray-100 transition-transform group-hover:scale-105">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg">{card.title}</h3>
                  <p className="text-sm opacity-90">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardShowcase;
