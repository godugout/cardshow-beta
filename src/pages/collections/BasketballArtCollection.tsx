import React from 'react';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';
import type { Card } from '@/lib/types/unifiedCardTypes';

const basketballCards: Card[] = [
  {
    id: 'basketball-1',
    title: 'Michael Jordan',
    description: 'The greatest basketball player of all time',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'chicago bulls'],
    userId: 'collection-user',
    effects: ['holographic'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Michael Jordan',
    team: 'Chicago Bulls',
    year: '1996'
  },
  {
    id: 'basketball-2',
    title: 'LeBron James',
    description: 'One of the most dominant players in NBA history',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'superstar', 'los angeles lakers'],
    userId: 'collection-user',
    effects: ['chrome'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'LeBron James',
    team: 'Los Angeles Lakers',
    year: '2020'
  },
  {
    id: 'basketball-3',
    title: 'Kobe Bryant',
    description: 'The Black Mamba, known for his incredible work ethic',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'los angeles lakers'],
    userId: 'collection-user',
    effects: ['gold'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Kobe Bryant',
    team: 'Los Angeles Lakers',
    year: '2008'
  },
  {
    id: 'basketball-4',
    title: 'Stephen Curry',
    description: 'Revolutionary shooter who changed the game',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'superstar', 'golden state warriors'],
    userId: 'collection-user',
    effects: ['prismatic'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Stephen Curry',
    team: 'Golden State Warriors',
    year: '2016'
  },
  {
    id: 'basketball-5',
    title: 'Magic Johnson',
    description: 'Legendary point guard with incredible court vision',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'los angeles lakers'],
    userId: 'collection-user',
    effects: ['vintage'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Magic Johnson',
    team: 'Los Angeles Lakers',
    year: '1985'
  },
  {
    id: 'basketball-6',
    title: 'Larry Bird',
    description: 'One of the greatest shooters and passers in NBA history',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'boston celtics'],
    userId: 'collection-user',
    effects: ['vintage'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Larry Bird',
    team: 'Boston Celtics',
    year: '1986'
  },
  {
    id: 'basketball-7',
    title: 'Kareem Abdul-Jabbar',
    description: 'NBA all-time leading scorer and master of the skyhook',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'los angeles lakers'],
    userId: 'collection-user',
    effects: ['vintage'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Kareem Abdul-Jabbar',
    team: 'Los Angeles Lakers',
    year: '1980'
  },
  {
    id: 'basketball-8',
    title: 'Shaquille O\'Neal',
    description: 'The most dominant center in modern basketball',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['basketball', 'legend', 'los angeles lakers'],
    userId: 'collection-user',
    effects: ['refractor'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA,
    player: 'Shaquille O\'Neal',
    team: 'Los Angeles Lakers',
    year: '2000'
  }
];

const BasketballArtCollection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Basketball Art Collection</h1>
        <p className="text-muted-foreground">Celebrating the legends of basketball</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {basketballCards.map((card) => (
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

export default BasketballArtCollection;
