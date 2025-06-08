
import React from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Badge } from '@/components/ui/badge';

interface CardDescriptionProps {
  card: Card;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ card, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
        <p className="text-gray-600">
          {card.player || card.name || 'Unknown Player'} - {card.jersey || 'N/A'}
        </p>
      </div>
      
      {card.description && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{card.description}</p>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Player:</span> {card.player || card.name || 'Unknown'}</p>
          <p><span className="font-medium">Team:</span> {card.team || 'Unknown'}</p>
          <p><span className="font-medium">Year:</span> {card.year || 'Unknown'}</p>
          <p><span className="font-medium">Jersey:</span> {card.jersey || 'N/A'}</p>
        </div>
      </div>
      
      {card.tags && card.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDescription;
