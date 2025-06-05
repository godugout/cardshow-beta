
import React from 'react';
import { Card } from '@/lib/types/cardTypes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { CardStyle, DEFAULT_CARD_STYLE } from '@/components/card-templates/TemplateTypes';

interface DesignStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
}

const DesignStep: React.FC<DesignStepProps> = ({ cardData, onUpdate }) => {
  const currentCardStyle = cardData.designMetadata?.cardStyle || DEFAULT_CARD_STYLE;

  const updateCardStyle = (updates: Partial<CardStyle>) => {
    const newCardStyle = { ...currentCardStyle, ...updates };
    onUpdate({
      designMetadata: {
        ...cardData.designMetadata,
        cardStyle: newCardStyle
      }
    });
  };

  const effectOptions = [
    { value: 'none', label: 'None' },
    { value: 'holographic', label: 'Holographic' },
    { value: 'refractor', label: 'Refractor' },
    { value: 'prismatic', label: 'Prismatic' },
    { value: 'chrome', label: 'Chrome' },
    { value: 'vintage', label: 'Vintage' }
  ];

  const templateOptions = [
    { value: 'classic', label: 'Classic' },
    { value: 'modern', label: 'Modern' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'minimal', label: 'Minimal' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div 
            className="aspect-[2.5/3.5] max-w-xs rounded-lg border-2 shadow-lg"
            style={{
              backgroundColor: currentCardStyle.backgroundColor,
              borderColor: currentCardStyle.borderColor,
              borderRadius: currentCardStyle.borderRadius,
              borderWidth: `${currentCardStyle.borderWidth}px`
            }}
          >
            {cardData.imageUrl && (
              <img 
                src={cardData.imageUrl} 
                alt="Card preview"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Design Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Design</h3>
          
          {/* Background Color */}
          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker
              color={currentCardStyle.backgroundColor}
              onChange={(color) => updateCardStyle({ backgroundColor: color })}
            />
          </div>

          {/* Border Color */}
          <div className="space-y-2">
            <Label>Border Color</Label>
            <ColorPicker
              color={currentCardStyle.borderColor}
              onChange={(color) => updateCardStyle({ borderColor: color })}
            />
          </div>

          {/* Effect */}
          <div className="space-y-2">
            <Label>Card Effect</Label>
            <Select 
              value={currentCardStyle.effect} 
              onValueChange={(value) => updateCardStyle({ effect: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select effect" />
              </SelectTrigger>
              <SelectContent>
                {effectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shadow Color */}
          <div className="space-y-2">
            <Label>Shadow Color</Label>
            <ColorPicker
              color={currentCardStyle.shadowColor}
              onChange={(color) => updateCardStyle({ shadowColor: color })}
            />
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label>Card Template</Label>
            <Select 
              value={currentCardStyle.template} 
              onValueChange={(value) => updateCardStyle({ template: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Border Radius */}
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Input
              type="text"
              value={currentCardStyle.borderRadius}
              onChange={(e) => updateCardStyle({ borderRadius: e.target.value })}
              placeholder="8px"
            />
          </div>

          {/* Border Width */}
          <div className="space-y-2">
            <Label>Border Width</Label>
            <Input
              type="number"
              value={currentCardStyle.borderWidth}
              onChange={(e) => updateCardStyle({ borderWidth: parseInt(e.target.value) || 0 })}
              min="0"
              max="10"
            />
          </div>

          {/* Frame Color */}
          <div className="space-y-2">
            <Label>Frame Color</Label>
            <ColorPicker
              color={currentCardStyle.frameColor}
              onChange={(color) => updateCardStyle({ frameColor: color })}
            />
          </div>

          {/* Frame Width */}
          <div className="space-y-2">
            <Label>Frame Width</Label>
            <Input
              type="number"
              value={currentCardStyle.frameWidth}
              onChange={(e) => updateCardStyle({ frameWidth: parseInt(e.target.value) || 0 })}
              min="0"
              max="20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStep;
