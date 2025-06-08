
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import TagInput from '@/components/card-editor/TagInput';

interface CardTextStepProps {
  cardData: {
    title: string;
    description: string;
    tags: string[];
    player?: string;
    team?: string;
    year?: string;
    [key: string]: any;
  };
  onUpdate: (updates: any) => void;
  onContinue?: () => void;
}

const CardTextStep: React.FC<CardTextStepProps> = ({ 
  cardData, 
  onUpdate, 
  onContinue 
}) => {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleAddTag = (tag: string) => {
    const newTags = [...cardData.tags, tag];
    onUpdate({ tags: newTags });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = cardData.tags.filter(tag => tag !== tagToRemove);
    onUpdate({ tags: newTags });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Card Information</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Card Title</Label>
            <Input
              id="title"
              value={cardData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter card title"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={cardData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter card description"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="player">Player</Label>
              <Input
                id="player"
                value={cardData.player || ''}
                onChange={(e) => handleInputChange('player', e.target.value)}
                placeholder="Player name"
              />
            </div>
            
            <div>
              <Label htmlFor="team">Team</Label>
              <Input
                id="team"
                value={cardData.team || ''}
                onChange={(e) => handleInputChange('team', e.target.value)}
                placeholder="Team name"
              />
            </div>
            
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={cardData.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="Year"
              />
            </div>
          </div>
          
          <TagInput
            tags={cardData.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
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
