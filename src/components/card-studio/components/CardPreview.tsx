
import React from 'react';
import { Card } from '@/lib/types/core';

interface CardPreviewProps {
  card: Partial<Card>;
  className?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {card.imageUrl && (
        <img 
          src={card.imageUrl} 
          alt={card.title || 'Card'} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg">{card.title || 'Untitled Card'}</h3>
        {card.description && (
          <p className="text-muted-foreground text-sm mt-1">{card.description}</p>
        )}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {card.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
