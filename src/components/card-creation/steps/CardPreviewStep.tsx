
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/lib/types/unifiedCardTypes';

interface CardPreviewStepProps {
  cardData: Partial<Card>;
  onSave: () => Promise<void>;
  onUpdate?: (updates: Partial<Card>) => void;
  effectClasses?: string;
}

const CardPreviewStep: React.FC<CardPreviewStepProps> = ({
  cardData,
  onSave,
  onUpdate,
  effectClasses = ''
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Preview Your Card</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`relative aspect-[2.5/3.5] max-w-sm mx-auto ${effectClasses}`}>
              {cardData.imageUrl && (
                <img 
                  src={cardData.imageUrl} 
                  alt={cardData.title || 'Card Preview'}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">{cardData.title || 'Untitled Card'}</h4>
              <p className="text-gray-600">{cardData.description || 'No description'}</p>
            </div>
            
            {cardData.player && (
              <div>
                <h5 className="font-medium">Player</h5>
                <p className="text-gray-700">{cardData.player}</p>
              </div>
            )}
            
            {cardData.team && (
              <div>
                <h5 className="font-medium">Team</h5>
                <p className="text-gray-700">{cardData.team}</p>
              </div>
            )}
            
            {cardData.year && (
              <div>
                <h5 className="font-medium">Year</h5>
                <p className="text-gray-700">{cardData.year}</p>
              </div>
            )}
            
            {cardData.tags && cardData.tags.length > 0 && (
              <div>
                <h5 className="font-medium">Tags</h5>
                <div className="flex flex-wrap gap-2">
                  {cardData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={onSave}>
          Save Card
        </Button>
      </div>
    </div>
  );
};

export default CardPreviewStep;
