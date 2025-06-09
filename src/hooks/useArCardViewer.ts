
import { useState, useCallback } from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';

export const useArCardViewer = () => {
  const [cards] = useState<Card[]>([
    {
      id: 'ar-sample-1',
      title: 'Sample AR Card 1',
      description: 'A sample card for AR viewing',
      imageUrl: '/placeholder-card.png',
      thumbnailUrl: '/placeholder-card.png',
      tags: ['sample', 'ar'],
      userId: 'system',
      effects: ['holographic'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        cardStyle: {
          template: 'classic',
          effect: 'holographic',
          borderRadius: '8px',
          borderColor: '#000000',
          frameColor: '#000000',
          frameWidth: 2,
          shadowColor: 'rgba(0,0,0,0.2)',
        },
        textStyle: {
          titleColor: '#000000',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#333333',
        },
        cardMetadata: {
          category: 'general',
          series: 'base',
          cardType: 'standard'
        },
        marketMetadata: {
          isPrintable: false,
          isForSale: false,
          includeInCatalog: false,
          price: 0,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1,
          editionNumber: 1
        }
      }
    },
    {
      id: 'ar-sample-2',
      title: 'Sample AR Card 2',
      description: 'Another sample card for AR viewing',
      imageUrl: '/placeholder-card.png',
      thumbnailUrl: '/placeholder-card.png',
      tags: ['sample', 'ar'],
      userId: 'system',
      effects: ['chrome'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        cardStyle: {
          template: 'modern',
          effect: 'chrome',
          borderRadius: '10px',
          borderColor: '#000000',
          frameColor: '#000000',
          frameWidth: 2,
          shadowColor: 'rgba(0,0,0,0.2)',
        },
        textStyle: {
          titleColor: '#000000',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#333333',
        },
        cardMetadata: {
          category: 'general',
          series: 'base',
          cardType: 'standard'
        },
        marketMetadata: {
          isPrintable: false,
          isForSale: false,
          includeInCatalog: false,
          price: 0,
          currency: 'USD',
          availableForSale: false,
          editionSize: 1,
          editionNumber: 1
        }
      }
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<Card | null>(cards[0] || null);

  const selectCard = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  return {
    cards,
    selectedCard,
    selectCard
  };
};
