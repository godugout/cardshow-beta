
import React from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { CardPreviewStepProps } from '@/components/gallery/types';
import { Button } from '@/components/ui/button';

const CardPreviewStep: React.FC<CardPreviewStepProps> = ({ 
  cardData, 
  onUpdate, 
  onSave, 
  onExport 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Card Preview</h3>
        
        <div className="relative mx-auto max-w-sm">
          <div className="aspect-[2.5/3.5] w-full rounded-lg overflow-hidden border-2 border-gray-600/30 shadow-lg">
            {cardData.imageUrl ? (
              <img 
                src={cardData.imageUrl} 
                alt={cardData.title || 'Card preview'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">No image uploaded</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <h4 className="text-xl font-bold">{cardData.title || 'Untitled Card'}</h4>
          {cardData.description && (
            <p className="text-gray-300 mt-2">{cardData.description}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
          Save Card
        </Button>
        {onExport && (
          <Button onClick={() => onExport('png')} variant="outline">
            Export PNG
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardPreviewStep;
