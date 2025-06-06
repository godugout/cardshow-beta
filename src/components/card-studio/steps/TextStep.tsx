import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, DesignMetadata } from '@/lib/types';

interface TextStepProps {
  card: Card;
  designMetadata: DesignMetadata;
  setDesignMetadata: (metadata: DesignMetadata) => void;
}

const TextStep = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [designMetadata, setDesignMetadata] = useState<DesignMetadata>({
    cardStyle: {
      template: 'classic',
      effect: 'none',
      borderRadius: '8px',
      borderColor: '#000000',
      shadowColor: 'rgba(0,0,0,0.2)',
      frameWidth: 2,
      frameColor: '#000000',
    },
    textStyle: {
      titleColor: '#000000',
      titleAlignment: 'center',
      titleWeight: 'bold',
      descriptionColor: '#333333',
    },
    cardMetadata: {
      category: 'sample',
      series: 'demo',
      cardType: 'standard',
    },
    marketMetadata: {
      isPrintable: false,
      isForSale: false,
      includeInCatalog: false,
    }
  });
  
  useEffect(() => {
    setTitle(title);
    setDescription(description);
  }, [title, description]);
  
  const updateDesignMetadata = (updates: Partial<DesignMetadata>) => {
    const newMetadata = {
      ...designMetadata,
      ...updates,
      marketMetadata: {
        isPrintable: false,
        isForSale: false,
        includeInCatalog: false,
        ...designMetadata.marketMetadata,
        ...updates.marketMetadata
      }
    };
    setDesignMetadata(newMetadata);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-title">Card Title</Label>
        <Input
          type="text"
          id="card-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateDesignMetadata({ textStyle: { ...designMetadata.textStyle, titleColor: e.target.value } });
          }}
        />
      </div>
      <div>
        <Label htmlFor="card-description">Card Description</Label>
        <Textarea
          id="card-description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            updateDesignMetadata({ textStyle: { ...designMetadata.textStyle, descriptionColor: e.target.value } });
          }}
        />
      </div>
    </div>
  );
};

export default TextStep;
