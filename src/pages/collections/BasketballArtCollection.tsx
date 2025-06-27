
import React from 'react';
import { Card } from '@/lib/types/core';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

const BasketballArtCollection = () => {
  const cardData: Card[] = [
    {
      id: '1',
      title: 'Michael Jordan Championship',
      description: 'Iconic moment from the 1991 NBA Finals',
      imageUrl: 'https://placehold.co/300x400/ff6b6b/ffffff?text=MJ+91+Finals',
      thumbnailUrl: 'https://placehold.co/150x200/ff6b6b/ffffff?text=MJ+91+Finals',
      tags: ['basketball', 'michael jordan', 'nba finals', 'championship'],
      effects: [stringToCardEffect('holographic')],
      userId: 'user1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '2',
      title: 'Magic Johnson Showtime',
      description: 'Lakers Showtime era highlight',
      imageUrl: 'https://placehold.co/300x400/4ecdc4/ffffff?text=Magic+Showtime',
      thumbnailUrl: 'https://placehold.co/150x200/4ecdc4/ffffff?text=Magic+Showtime',
      tags: ['basketball', 'magic johnson', 'lakers', 'showtime'],
      effects: [stringToCardEffect('prismatic')],
      userId: 'user1',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '3',
      title: 'Larry Bird Celtic Pride',
      description: 'The Hick from French Lick in action',
      imageUrl: 'https://placehold.co/300x400/45b7d1/ffffff?text=Bird+Celtic',
      thumbnailUrl: 'https://placehold.co/150x200/45b7d1/ffffff?text=Bird+Celtic',
      tags: ['basketball', 'larry bird', 'celtics', 'classic'],
      effects: [stringToCardEffect('refractor')],
      userId: 'user1',
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '4',
      title: 'Kobe Bryant Mamba Mentality',
      description: 'Black Mamba in his prime',
      imageUrl: 'https://placehold.co/300x400/96ceb4/ffffff?text=Kobe+Mamba',
      thumbnailUrl: 'https://placehold.co/150x200/96ceb4/ffffff?text=Kobe+Mamba',
      tags: ['basketball', 'kobe bryant', 'lakers', 'mamba'],
      effects: [stringToCardEffect('sparkle')],
      userId: 'user1',
      createdAt: '2023-01-04T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '5',
      title: 'LeBron James King',
      description: 'The King dominating the court',
      imageUrl: 'https://placehold.co/300x400/feca57/ffffff?text=LeBron+King',
      thumbnailUrl: 'https://placehold.co/150x200/feca57/ffffff?text=LeBron+King',
      tags: ['basketball', 'lebron james', 'cavs', 'championship'],
      effects: [stringToCardEffect('foil')],
      userId: 'user1',
      createdAt: '2023-01-05T00:00:00Z',
      updatedAt: '2023-01-05T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '6',
      title: 'Shaquille ONeal Dominance',
      description: 'Shaq dominating the paint',
      imageUrl: 'https://placehold.co/300x400/ff9ff3/ffffff?text=Shaq+Dominance',
      thumbnailUrl: 'https://placehold.co/150x200/ff9ff3/ffffff?text=Shaq+Dominance',
      tags: ['basketball', 'shaquille oneal', 'lakers', 'dominant'],
      effects: [stringToCardEffect('rainbow')],
      userId: 'user1',
      createdAt: '2023-01-06T00:00:00Z',
      updatedAt: '2023-01-06T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '7',
      title: 'Tim Duncan Fundamentals',
      description: 'The Big Fundamental in action',
      imageUrl: 'https://placehold.co/300x400/54a0ff/ffffff?text=Duncan+Fundamentals',
      thumbnailUrl: 'https://placehold.co/150x200/54a0ff/ffffff?text=Duncan+Fundamentals',
      tags: ['basketball', 'tim duncan', 'spurs', 'fundamentals'],
      effects: [stringToCardEffect('holographic')],
      userId: 'user1',
      createdAt: '2023-01-07T00:00:00Z',
      updatedAt: '2023-01-07T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    },
    {
      id: '8',
      title: 'Stephen Curry Revolution',
      description: 'The three-point revolution',
      imageUrl: 'https://placehold.co/300x400/ff6348/ffffff?text=Curry+Revolution',
      thumbnailUrl: 'https://placehold.co/150x200/ff6348/ffffff?text=Curry+Revolution',
      tags: ['basketball', 'stephen curry', 'warriors', 'three-point'],
      effects: [stringToCardEffect('prismatic')],
      userId: 'user1',
      createdAt: '2023-01-08T00:00:00Z',
      updatedAt: '2023-01-08T00:00:00Z',
      designMetadata: DEFAULT_DESIGN_METADATA
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Basketball Art Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Legendary moments captured in stunning digital trading cards. Each card represents an iconic moment 
            in basketball history with premium holographic effects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cardData.map((card) => (
            <div key={card.id} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="aspect-[2.5/3.5] relative overflow-hidden">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                      {card.effects[0]?.type || 'standard'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {card.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {card.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        +{card.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Premium Effect</span>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
                      View Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Collect Basketball History
            </h2>
            <p className="text-gray-600 mb-6">
              Each card in this collection features premium holographic effects and represents a pivotal moment 
              in basketball history. Start building your legendary collection today.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
              Start Collecting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketballArtCollection;
