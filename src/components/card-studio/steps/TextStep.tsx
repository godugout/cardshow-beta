
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, DesignMetadata } from '@/lib/types';

interface TextStepProps {
  cardData: Partial<Card>;
  onUpdate: (updates: Partial<Card>) => void;
}

const TextStep: React.FC<TextStepProps> = ({ cardData, onUpdate }) => {
  const [title, setTitle] = useState(cardData.title || '');
  const [description, setDescription] = useState(cardData.description || '');
  
  useEffect(() => {
    setTitle(cardData.title || '');
    setDescription(cardData.description || '');
  }, [cardData]);
  
  const handleTitleChange = (value: string) => {
    setTitle(value);
    onUpdate({ title: value });
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    onUpdate({ description: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-title">Card Title</Label>
        <Input
          type="text"
          id="card-title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="card-description">Card Description</Label>
        <Textarea
          id="card-description"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextStep;
