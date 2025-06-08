
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CardEffect, PremiumCardEffect } from '@/lib/types/cardEffects';

// Mock card effects data
const mockCardEffects: PremiumCardEffect[] = [
  {
    id: 'holographic',
    name: 'Holographic',
    enabled: false,
    settings: {
      intensity: 50,
      speed: 1,
      hue: 0
    },
    isPremium: true,
    tier: 'premium',
    description: 'Rainbow holographic effect that shifts colors',
    premium: true,
    category: 'special',
    cssClass: 'holographic-effect'
  },
  {
    id: 'prismatic',
    name: 'Prismatic',
    enabled: false,
    settings: {
      intensity: 75,
      angle: 45
    },
    isPremium: true,
    tier: 'premium',
    description: 'Light refraction creating rainbow patterns',
    premium: true,
    category: 'special',
    cssClass: 'prismatic-effect'
  },
  {
    id: 'refractor',
    name: 'Refractor',
    enabled: false,
    settings: {
      intensity: 60,
      segments: 8
    },
    isPremium: false,
    tier: 'basic',
    description: 'Segmented light refraction effect',
    premium: false,
    category: 'basic',
    cssClass: 'refractor-effect'
  }
];

interface CardEffectsDemoProps {
  className?: string;
}

const CardEffectsDemo: React.FC<CardEffectsDemoProps> = ({ className }) => {
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [effectSettings, setEffectSettings] = useState<Record<string, any>>({});
  const [previewCard, setPreviewCard] = useState({
    title: 'Sample Card',
    description: 'This is a preview card to test effects',
    imageUrl: '/placeholder-card.png'
  });

  // Initialize effect settings
  useEffect(() => {
    const initialSettings: Record<string, any> = {};
    mockCardEffects.forEach(effect => {
      initialSettings[effect.id] = effect.settings;
    });
    setEffectSettings(initialSettings);
  }, []);

  const toggleEffect = (effectId: string) => {
    setActiveEffects(prev => {
      if (prev.includes(effectId)) {
        return prev.filter(id => id !== effectId);
      } else {
        return [...prev, effectId];
      }
    });
  };

  const updateEffectSettings = (effectId: string, newSettings: any) => {
    setEffectSettings(prev => ({
      ...prev,
      [effectId]: { ...prev[effectId], ...newSettings }
    }));
  };

  const getEffectClasses = () => {
    return activeEffects
      .map(effectId => {
        const effect = mockCardEffects.find(e => e.id === effectId);
        return effect?.cssClass || '';
      })
      .filter(Boolean)
      .join(' ');
  };

  const clearAllEffects = () => {
    setActiveEffects([]);
  };

  // Convert PremiumCardEffect to CardEffect for internal use
  const convertToCardEffect = (premiumEffect: PremiumCardEffect): CardEffect => {
    return {
      id: premiumEffect.id,
      name: premiumEffect.name,
      enabled: premiumEffect.enabled || false,
      settings: premiumEffect.settings,
      className: premiumEffect.cssClass
    };
  };

  const renderEffectControls = (effect: PremiumCardEffect) => {
    const isActive = activeEffects.includes(effect.id);
    const settings = effectSettings[effect.id] || {};

    return (
      <div key={effect.id} className="p-4 border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Label htmlFor={`effect-${effect.id}`} className="font-medium">
              {effect.name}
            </Label>
            {effect.isPremium && (
              <Badge variant="secondary" className="text-xs">
                Premium
              </Badge>
            )}
          </div>
          <Switch
            id={`effect-${effect.id}`}
            checked={isActive}
            onCheckedChange={() => toggleEffect(effect.id)}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{effect.description}</p>
        
        {isActive && (
          <div className="space-y-3">
            {settings.intensity !== undefined && (
              <div>
                <Label className="text-xs">Intensity: {settings.intensity}%</Label>
                <Slider
                  value={[settings.intensity]}
                  onValueChange={([value]) => 
                    updateEffectSettings(effect.id, { intensity: value })
                  }
                  max={100}
                  step={1}
                  className="mt-1"
                />
              </div>
            )}
            
            {settings.speed !== undefined && (
              <div>
                <Label className="text-xs">Speed: {settings.speed}x</Label>
                <Slider
                  value={[settings.speed]}
                  onValueChange={([value]) => 
                    updateEffectSettings(effect.id, { speed: value })
                  }
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="mt-1"
                />
              </div>
            )}
            
            {settings.angle !== undefined && (
              <div>
                <Label className="text-xs">Angle: {settings.angle}°</Label>
                <Slider
                  value={[settings.angle]}
                  onValueChange={([value]) => 
                    updateEffectSettings(effect.id, { angle: value })
                  }
                  max={360}
                  step={1}
                  className="mt-1"
                />
              </div>
            )}
            
            {settings.segments !== undefined && (
              <div>
                <Label className="text-xs">Segments: {settings.segments}</Label>
                <Slider
                  value={[settings.segments]}
                  onValueChange={([value]) => 
                    updateEffectSettings(effect.id, { segments: value })
                  }
                  min={4}
                  max={16}
                  step={1}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn(
            "relative w-full aspect-[2.5/3.5] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden",
            getEffectClasses()
          )}>
            <div className="absolute inset-4 bg-white rounded-md shadow-sm flex flex-col">
              <div className="flex-1 bg-gray-100 rounded-t-md"></div>
              <div className="p-3">
                <h3 className="font-bold text-sm">{previewCard.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{previewCard.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllEffects}
              disabled={activeEffects.length === 0}
            >
              Clear All
            </Button>
            <Badge variant="outline">
              {activeEffects.length} effect{activeEffects.length !== 1 ? 's' : ''} active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Effects Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Card Effects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCardEffects.map(effect => renderEffectControls(effect))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardEffectsDemo;
