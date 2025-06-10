
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface CardEffectsStepProps {
  effectStack: any[];
  addEffect: (name: string) => void;
  removeEffect: (id: string) => void;
  updateEffectSettings: (id: string, settings: any) => void;
  onContinue: () => void;
}

const CardEffectsStep: React.FC<CardEffectsStepProps> = ({
  effectStack,
  addEffect,
  removeEffect,
  updateEffectSettings,
  onContinue
}) => {
  const availableEffects = [
    { id: 'holographic', name: 'Holographic', description: 'Rainbow holographic effect' },
    { id: 'prismatic', name: 'Prismatic', description: 'Light refraction effect' },
    { id: 'foil', name: 'Foil', description: 'Metallic foil finish' },
    { id: 'sparkle', name: 'Sparkle', description: 'Glittering sparkles' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Add Visual Effects</h3>
        <p className="text-muted-foreground">Make your card stand out with special effects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableEffects.map((effect) => (
          <Card key={effect.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {effect.name}
                </h4>
                <p className="text-sm text-muted-foreground">{effect.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addEffect(effect.id)}
              >
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {effectStack.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-2">Active Effects</h4>
          <div className="space-y-2">
            {effectStack.map((effect, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{effect.name || effect.type}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEffect(effect.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CardEffectsStep;
