
import React from 'react';
import { Card } from '@/lib/types/cardTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { MarketMetadata, CardMetadata, DEFAULT_CARD_STYLE, DEFAULT_TEXT_STYLE } from '@/components/card-templates/TemplateTypes';

interface FinalizeStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
}

const FinalizeStep: React.FC<FinalizeStepProps> = ({ cardData, onUpdate }) => {
  const [newTag, setNewTag] = React.useState('');
  
  const currentMarketMetadata: MarketMetadata = cardData.designMetadata?.marketMetadata || {
    isPrintable: false,
    isForSale: false,
    includeInCatalog: false,
    price: 0,
    currency: 'USD',
    availableForSale: false,
    editionSize: 1,
    editionNumber: 1,
  };

  const currentCardMetadata: CardMetadata = cardData.designMetadata?.cardMetadata || {
    category: 'general',
    series: 'base',
    cardType: 'standard',
  };

  const updateMarketMetadata = (updates: Partial<MarketMetadata>) => {
    const newMarketMetadata = { ...currentMarketMetadata, ...updates };
    onUpdate({
      designMetadata: {
        cardStyle: cardData.designMetadata?.cardStyle || DEFAULT_CARD_STYLE,
        textStyle: cardData.designMetadata?.textStyle || DEFAULT_TEXT_STYLE,
        marketMetadata: newMarketMetadata,
        cardMetadata: currentCardMetadata,
        ...cardData.designMetadata
      }
    });
  };

  const updateCardMetadata = (updates: Partial<CardMetadata>) => {
    const newCardMetadata = { ...currentCardMetadata, ...updates };
    onUpdate({
      designMetadata: {
        cardStyle: cardData.designMetadata?.cardStyle || DEFAULT_CARD_STYLE,
        textStyle: cardData.designMetadata?.textStyle || DEFAULT_TEXT_STYLE,
        marketMetadata: currentMarketMetadata,
        cardMetadata: newCardMetadata,
        ...cardData.designMetadata
      }
    });
  };

  const addTag = () => {
    if (newTag.trim() && !cardData.tags?.includes(newTag.trim())) {
      onUpdate({ 
        tags: [...(cardData.tags || []), newTag.trim()] 
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onUpdate({ 
      tags: cardData.tags?.filter(tag => tag !== tagToRemove) || [] 
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Metadata */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Metadata</h3>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={currentCardMetadata.category || ''}
              onChange={(e) => updateCardMetadata({ category: e.target.value })}
              placeholder="sports, entertainment, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="series">Series</Label>
            <Input
              id="series"
              value={currentCardMetadata.series || ''}
              onChange={(e) => updateCardMetadata({ series: e.target.value })}
              placeholder="Series name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardType">Card Type</Label>
            <Input
              id="cardType"
              value={currentCardMetadata.cardType || ''}
              onChange={(e) => updateCardMetadata({ cardType: e.target.value })}
              placeholder="standard, special, limited, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rarity">Rarity</Label>
            <Input
              id="rarity"
              value={cardData.rarity || ''}
              onChange={(e) => onUpdate({ rarity: e.target.value })}
              placeholder="common, rare, epic, legendary"
            />
          </div>
        </div>

        {/* Market Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Market Settings</h3>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isPrintable"
              checked={currentMarketMetadata.isPrintable}
              onCheckedChange={(checked) => updateMarketMetadata({ isPrintable: checked })}
            />
            <Label htmlFor="isPrintable">Enable Physical Printing</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isForSale"
              checked={currentMarketMetadata.isForSale}
              onCheckedChange={(checked) => updateMarketMetadata({ isForSale: checked })}
            />
            <Label htmlFor="isForSale">List for Sale</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="includeInCatalog"
              checked={currentMarketMetadata.includeInCatalog}
              onCheckedChange={(checked) => updateMarketMetadata({ includeInCatalog: checked })}
            />
            <Label htmlFor="includeInCatalog">Include in Public Catalog</Label>
          </div>

          {currentMarketMetadata.isForSale && (
            <div className="space-y-2">
              <Label htmlFor="price">Price ({currentMarketMetadata.currency})</Label>
              <Input
                id="price"
                type="number"
                value={currentMarketMetadata.price || ''}
                onChange={(e) => updateMarketMetadata({ price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                step="0.01"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="editionSize">Edition Size</Label>
            <Input
              id="editionSize"
              type="number"
              value={currentMarketMetadata.editionSize || 1}
              onChange={(e) => updateMarketMetadata({ editionSize: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tags</h3>
        
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <Button onClick={addTag} variant="outline">Add</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {cardData.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalizeStep;
