
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

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
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Add Card Details</h3>
        <p className="text-muted-foreground">Enter the text and information for your card</p>
      </div>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Card Title</Label>
            <Input
              id="title"
              value={cardData.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Enter card title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={cardData.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Enter card description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="player">Player</Label>
              <Input
                id="player"
                value={cardData.player || ''}
                onChange={(e) => onUpdate({ player: e.target.value })}
                placeholder="Player name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Input
                id="team"
                value={cardData.team || ''}
                onChange={(e) => onUpdate({ team: e.target.value })}
                placeholder="Team name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={cardData.year || ''}
                onChange={(e) => onUpdate({ year: e.target.value })}
                placeholder="Year"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardTextStep;
