import React from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

const CardShowcase = () => {
  const sampleCards: Card[] = [
    {
      id: '1',
      title: 'Holographic Baseball Card',
      description: 'A stunning holographic effect baseball card',
      imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390',
      thumbnailUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390',
      effects: [stringToCardEffect('holographic')],
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        cardStyle: {
          template: 'classic',
          effect: 'holographic',
          borderRadius: '8px',
          borderColor: '#d4af37',
          frameColor: '#d4af37',
          frameWidth: 2,
          shadowColor: 'rgba(212, 175, 55, 0.3)',
        },
        textStyle: {
          titleColor: '#1a202c',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#4a5568',
        },
        cardMetadata: {
          category: 'sports',
          series: 'upper-deck-1989',
          cardType: 'rookie',
          cardNumber: '1',
          artist: 'Upper Deck',
          rarity: 'legendary'
        },
        marketMetadata: {
          isPrintable: true,
          isForSale: false,
          includeInCatalog: true,
          price: 299.99,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1000,
          editionNumber: 1
        }
      }
    },
    {
      id: '2',
      title: 'Chrome Basketball Card',
      description: 'Premium chrome finish basketball card',
      imageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04',
      effects: [stringToCardEffect('chrome')],
      userId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        cardStyle: {
          template: 'classic',
          effect: 'chrome',
          borderRadius: '8px',
          borderColor: '#d4af37',
          frameColor: '#d4af37',
          frameWidth: 2,
          shadowColor: 'rgba(212, 175, 55, 0.3)',
        },
        textStyle: {
          titleColor: '#1a202c',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#4a5568',
        },
        cardMetadata: {
          category: 'sports',
          series: 'upper-deck-1989',
          cardType: 'rookie',
          cardNumber: '1',
          artist: 'Upper Deck',
          rarity: 'legendary'
        },
        marketMetadata: {
          isPrintable: true,
          isForSale: false,
          includeInCatalog: true,
          price: 299.99,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1000,
          editionNumber: 1
        }
      }
    },
    {
      id: '3',
      title: 'Refractor Football Card',
      description: 'Rare refractor football card with prismatic effects',
      imageUrl: 'https://images.unsplash.com/photo-1508344928928-7165b67de128',
      thumbnailUrl: 'https://images.unsplash.com/photo-1508344928928-7165b67de128',
      effects: [stringToCardEffect('refractor')],
      userId: '3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        cardStyle: {
          template: 'classic',
          effect: 'refractor',
          borderRadius: '8px',
          borderColor: '#d4af37',
          frameColor: '#d4af37',
          frameWidth: 2,
          shadowColor: 'rgba(212, 175, 55, 0.3)',
        },
        textStyle: {
          titleColor: '#1a202c',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#4a5568',
        },
        cardMetadata: {
          category: 'sports',
          series: 'upper-deck-1989',
          cardType: 'rookie',
          cardNumber: '1',
          artist: 'Upper Deck',
          rarity: 'legendary'
        },
        marketMetadata: {
          isPrintable: true,
          isForSale: false,
          includeInCatalog: true,
          price: 299.99,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1000,
          editionNumber: 1
        }
      }
    }
  ];

  return (
    <div>
      <h1>Card Showcase</h1>
      {sampleCards.map(card => (
        <div key={card.id}>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <img src={card.imageUrl} alt={card.title} style={{ width: '200px' }} />
        </div>
      ))}
    </div>
  );
};

export default CardShowcase;
