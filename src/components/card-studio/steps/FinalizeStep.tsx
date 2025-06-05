import React from 'react';
import { Card, CardRarity } from '@/lib/types/cardTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import CardPreview from '@/components/card-creation/components/CardPreview';

interface FinalizeStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
  onComplete: (card: Card) => void;
  onCancel: () => void;
}

const FinalizeStep: React.FC<FinalizeStepProps> = ({ 
  cardData, 
  onUpdate, 
  onComplete, 
  onCancel 
}) => {
  const handleComplete = () => {
    // Create the final card object
    const finalCard: Card = {
      id: cardData.id || `card-${Date.now()}`,
      title: cardData.title || 'Untitled Card',
      description: cardData.description || '',
      imageUrl: cardData.imageUrl || '',
      thumbnailUrl: cardData.thumbnailUrl || cardData.imageUrl || '',
      tags: cardData.tags || [],
      userId: cardData.userId || 'user-1',
      effects: cardData.effects || [],
      designMetadata: cardData.designMetadata || {
        cardStyle: { template: 'classic', effect: 'none', borderRadius: '8px', borderColor: '#000000', shadowColor: 'rgba(0,0,0,0.2)', frameWidth: 2, frameColor: '#000000' },
        textStyle: { titleColor: '#000000', titleAlignment: 'center', titleWeight: 'bold', descriptionColor: '#333333' },
        cardMetadata: { category: 'general' },
        marketMetadata: { isPrintable: false, isForSale: false, includeInCatalog: false }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rarity: (cardData.rarity as CardRarity) || 'common',
    };

    onComplete(finalCard);
  };

  const rarityOptions: { value: CardRarity; label: string }[] = [
    { value: 'common', label: 'Common' },
    { value: 'uncommon', label: 'Uncommon' },
    { value: 'rare', label: 'Rare' },
    { value: 'ultra-rare', label: 'Ultra Rare' },
    { value: 'legendary', label: 'Legendary' },
    { value: 'one-of-one', label: 'One of One' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Final Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="rarity">Card Rarity</Label>
            <Select
              value={cardData.rarity || 'common'}
              onValueChange={(value: CardRarity) => onUpdate({ rarity: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rarity" />
              </SelectTrigger>
              <SelectContent>
                {rarityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Optional)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={cardData.price || ''}
              onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Publishing Options</h4>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                checked={cardData.isPublic !== false}
                onCheckedChange={(checked) => onUpdate({ isPublic: checked === true })}
              />
              <Label htmlFor="isPublic">Make card public</Label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex justify-center">
            <CardPreview 
              cardData={cardData as Card} 
              className="transform scale-90" 
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleComplete}>
          Create Card
        </Button>
      </div>
    </div>
  );
};

export default FinalizeStep;
