
import React from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { CardTextStepProps } from '@/components/gallery/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CardTextStep: React.FC<CardTextStepProps> = ({ 
  cardData, 
  onUpdate, 
  onContinue 
}) => {
  const handleChange = (field: keyof Card, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Card Title
        </label>
        <Input
          id="title"
          value={cardData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter card title..."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <Textarea
          id="description"
          value={cardData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter card description..."
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="player" className="block text-sm font-medium mb-2">
          Player Name
        </label>
        <Input
          id="player"
          value={cardData.player || ''}
          onChange={(e) => handleChange('player', e.target.value)}
          placeholder="Enter player name..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="team" className="block text-sm font-medium mb-2">
            Team
          </label>
          <Input
            id="team"
            value={cardData.team || ''}
            onChange={(e) => handleChange('team', e.target.value)}
            placeholder="Enter team..."
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-2">
            Year
          </label>
          <Input
            id="year"
            value={cardData.year || ''}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="Enter year..."
          />
        </div>
      </div>

      {onContinue && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardTextStep;
