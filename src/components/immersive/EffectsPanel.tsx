
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PremiumCardEffect } from '@/lib/types/cardEffects';

interface EffectsPanelProps {
  availableEffects: PremiumCardEffect[];
  activeEffects: string[];
  onToggleEffect: (effectId: string) => void;
  onRemoveEffect: (effectId: string) => void;
  isEffectActive: (effectId: string) => boolean;
  getEffectIntensity: (effectId: string) => number;
  setEffectIntensity: (effectId: string, intensity: number) => void;
}

const EffectsPanel: React.FC<EffectsPanelProps> = ({
  availableEffects,
  activeEffects,
  onToggleEffect,
  onRemoveEffect,
  isEffectActive,
  getEffectIntensity,
  setEffectIntensity
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-white">Available Effects</h4>
      
      <div className="space-y-3">
        {availableEffects.map((effect) => (
          <div key={effect.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{effect.name}</span>
              <Button
                size="sm"
                variant={isEffectActive(effect.id) ? "default" : "outline"}
                onClick={() => onToggleEffect(effect.id)}
              >
                {isEffectActive(effect.id) ? 'Remove' : 'Add'}
              </Button>
            </div>
            
            {isEffectActive(effect.id) && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Intensity</span>
                  <span className="text-gray-300">{Math.round(getEffectIntensity(effect.id) * 100)}%</span>
                </div>
                <Slider
                  value={[getEffectIntensity(effect.id)]}
                  onValueChange={([value]) => setEffectIntensity(effect.id, value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {activeEffects.length > 0 && (
        <div className="pt-4 border-t border-gray-700">
          <h5 className="text-sm font-medium text-white mb-2">Active Effects</h5>
          <div className="space-y-1">
            {activeEffects.map((effectId) => {
              const effect = availableEffects.find(e => e.id === effectId);
              return (
                <div key={effectId} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{effect?.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveEffect(effectId)}
                    className="h-6 px-2 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EffectsPanel;
