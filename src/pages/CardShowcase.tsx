
import React, { useState } from 'react';
import { Card, CardEffect } from '@/lib/types/core';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

const CardShowcase = () => {
  const [selectedCard, setSelectedCard] = useState<Card>({
    id: '1',
    title: 'Holographic Trading Card',
    description: 'A stunning holographic effect card',
    imageUrl: 'https://placehold.co/300x400/png',
    thumbnailUrl: 'https://placehold.co/150x200/png',
    tags: ['holographic', 'premium', 'showcase'],
    effects: [stringToCardEffect('holographic')],
    userId: 'user1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    designMetadata: DEFAULT_DESIGN_METADATA
  });

  const cardVariations: Card[] = [
    {
      id: '1',
      title: 'Holographic Trading Card',
      description: 'A stunning holographic effect card',
      imageUrl: 'https://placehold.co/300x400/png',
      thumbnailUrl: 'https://placehold.co/150x200/png',
      tags: ['holographic', 'premium'],
      effects: [stringToCardEffect('holographic')],
      userId: 'user1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '2',
      title: 'Prismatic Crystal Card',
      description: 'Beautiful prismatic light effects',
      imageUrl: 'https://placehold.co/300x400/png',
      thumbnailUrl: 'https://placehold.co/150x200/png',
      tags: ['prismatic', 'crystal'],
      effects: [stringToCardEffect('prismatic')],
      userId: 'user1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '3',
      title: 'Refractor Sports Card',
      description: 'Classic refractor finish',
      imageUrl: 'https://placehold.co/300x400/png',
      thumbnailUrl: 'https://placehold.co/150x200/png',
      tags: ['refractor', 'sports'],
      effects: [stringToCardEffect('refractor')],
      userId: 'user1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Card Effect Showcase</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Display */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="aspect-[2.5/3.5] bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img 
                src={selectedCard.imageUrl} 
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{selectedCard.title}</h2>
            <p className="text-gray-600">{selectedCard.description}</p>
          </div>

          {/* Card Selection */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Select a Card Effect</h3>
            <div className="grid grid-cols-1 gap-4">
              {cardVariations.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedCard.id === card.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded">
                      {card.effects[0]?.type || 'No effect'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
