
import React from 'react';
import { Card } from '@/lib/types/cardTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { TextStyle, DEFAULT_TEXT_STYLE } from '@/components/card-templates/TemplateTypes';

interface TextStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
}

const TextStep: React.FC<TextStepProps> = ({ cardData, onUpdate }) => {
  const currentTextStyle = cardData.designMetadata?.textStyle || DEFAULT_TEXT_STYLE;

  const updateTextStyle = (updates: Partial<TextStyle>) => {
    const newTextStyle = { ...currentTextStyle, ...updates };
    onUpdate({
      designMetadata: {
        ...cardData.designMetadata,
        textStyle: newTextStyle
      }
    });
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' }
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const weightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '600', label: 'Semi Bold' },
    { value: '300', label: 'Light' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Text Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Content</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Card Title</Label>
            <Input
              id="title"
              value={cardData.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Enter card title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={cardData.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Enter card description"
              rows={4}
            />
          </div>
        </div>

        {/* Text Styling */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Text Styling</h3>
          
          {/* Font Family */}
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select 
              value={currentTextStyle.fontFamily} 
              onValueChange={(value) => updateTextStyle({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title Color */}
          <div className="space-y-2">
            <Label>Title Color</Label>
            <ColorPicker
              color={currentTextStyle.titleColor}
              onChange={(color) => updateTextStyle({ titleColor: color })}
            />
          </div>

          {/* Title Alignment */}
          <div className="space-y-2">
            <Label>Title Alignment</Label>
            <Select 
              value={currentTextStyle.titleAlignment} 
              onValueChange={(value) => updateTextStyle({ titleAlignment: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                {alignmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title Weight */}
          <div className="space-y-2">
            <Label>Title Weight</Label>
            <Select 
              value={currentTextStyle.titleWeight} 
              onValueChange={(value) => updateTextStyle({ titleWeight: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                {weightOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description Color */}
          <div className="space-y-2">
            <Label>Description Color</Label>
            <ColorPicker
              color={currentTextStyle.descriptionColor}
              onChange={(color) => updateTextStyle({ descriptionColor: color })}
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Input
              type="text"
              value={currentTextStyle.fontSize}
              onChange={(e) => updateTextStyle({ fontSize: e.target.value })}
              placeholder="16px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextStep;
