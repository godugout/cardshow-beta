import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';
import type { Card as CardType } from '@/lib/types/unifiedCardTypes';

const CardEffectsDemo: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState('holographic');
  
  const effects = [
    'holographic',
    'chrome',
    'vintage',
    'refractor',
    'gold',
    'prismatic'
  ];

  const demoCard: CardType = {
    id: 'demo-card',
    title: 'Demo Card',
    description: 'A demonstration card for effects',
    imageUrl: '/placeholder.svg',
    thumbnailUrl: '/placeholder.svg',
    tags: ['demo', 'effects'],
    userId: 'demo-user',
    player: 'Demo Player',
    team: 'Demo Team',
    year: '2024',
    effects: [selectedEffect],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    designMetadata: DEFAULT_DESIGN_METADATA
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Card Effects Demo</h1>
        <p className="text-muted-foreground">Experience the visual effects available for your cards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Effects</h2>
          <div className="grid grid-cols-2 gap-3">
            {effects.map((effect) => (
              <Button
                key={effect}
                variant={selectedEffect === effect ? "default" : "outline"}
                onClick={() => setSelectedEffect(effect)}
                className="capitalize"
              >
                {effect}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-64 aspect-[2.5/3.5] relative">
            <Card className={`w-full h-full card-effect-${selectedEffect}`}>
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <img
                  src={demoCard.imageUrl}
                  alt={demoCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold">{demoCard.title}</h3>
                  <p className="text-white/80 text-sm">{demoCard.description}</p>
                  <div className="flex gap-1 mt-2">
                    {demoCard.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEffectsDemo;
