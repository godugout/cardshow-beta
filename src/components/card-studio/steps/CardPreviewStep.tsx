
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';

interface CardPreviewStepProps {
  cardData: any;
  onUpdate: (updates: any) => void;
  onSave: () => void;
}

const CardPreviewStep: React.FC<CardPreviewStepProps> = ({
  cardData,
  onUpdate,
  onSave
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Preview Your Card</h3>
        <p className="text-muted-foreground">Review your card before saving</p>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {cardData.imageUrl && (
            <img 
              src={cardData.imageUrl} 
              alt={cardData.title} 
              className="w-64 h-80 object-cover rounded-lg shadow-lg"
            />
          )}
          
          <div className="text-center">
            <h4 className="text-xl font-bold">{cardData.title}</h4>
            <p className="text-muted-foreground">{cardData.description}</p>
            {cardData.player && (
              <p className="text-sm mt-2">
                <span className="font-medium">Player:</span> {cardData.player}
              </p>
            )}
            {cardData.team && (
              <p className="text-sm">
                <span className="font-medium">Team:</span> {cardData.team}
              </p>
            )}
            {cardData.year && (
              <p className="text-sm">
                <span className="font-medium">Year:</span> {cardData.year}
              </p>
            )}
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={onSave}>
              Save Card
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardPreviewStep;
