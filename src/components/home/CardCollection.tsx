
import React from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Button } from '@/components/ui/button';

interface CardCollectionProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  className?: string;
}

const CardCollection: React.FC<CardCollectionProps> = ({ 
  cards, 
  onCardClick,
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onCardClick?.(card)}
        >
          <div className="aspect-[2.5/3.5] overflow-hidden">
            <img 
              src={card.imageUrl} 
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Player: {card.player || card.name || 'Unknown'}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Jersey: {card.jersey || 'N/A'}
            </p>
            {card.description && (
              <p className="text-sm text-gray-500 line-clamp-2">{card.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCollection;
