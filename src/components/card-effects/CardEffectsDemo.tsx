
import React, { useState } from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { PremiumCardEffect } from '@/lib/types/cardEffects';

interface CardEffectsDemoProps {
  card: Card;
}

const mockEffects: PremiumCardEffect[] = [
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Creates a rainbow holographic effect',
    category: 'premium',
    isPremium: true,
    tier: 'premium',
    cssClass: 'effect-holographic',
    previewImage: '/effects/holographic-preview.jpg',
    price: 2.99,
    enabled: true,
    settings: {
      intensity: 0.8,
      speed: 1.0,
      pattern: 'rainbow'
    }
  },
  {
    id: 'refractor',
    name: 'Refractor',
    description: 'Light refraction effect with prismatic colors',
    category: 'premium',
    isPremium: true,
    tier: 'ultra',
    cssClass: 'effect-refractor',
    previewImage: '/effects/refractor-preview.jpg',
    price: 4.99,
    enabled: false,
    settings: {
      intensity: 0.6,
      color: '#ff00ff',
      animationEnabled: true
    }
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic aged card appearance',
    category: 'style',
    isPremium: false,
    tier: 'basic',
    cssClass: 'effect-vintage',
    previewImage: '/effects/vintage-preview.jpg',
    enabled: false,
    settings: {
      intensity: 0.5,
      pattern: 'aged'
    }
  }
];

const CardEffectsDemo: React.FC<CardEffectsDemoProps> = ({ card }) => {
  const [activeEffects, setActiveEffects] = useState<string[]>(['holographic']);
  const [selectedEffect, setSelectedEffect] = useState<PremiumCardEffect | null>(mockEffects[0]);

  const toggleEffect = (effectId: string) => {
    setActiveEffects(prev => 
      prev.includes(effectId) 
        ? prev.filter(id => id !== effectId)
        : [...prev, effectId]
    );
  };

  const updateEffectSettings = (effectId: string, settings: any) => {
    // Update effect settings logic here
    console.log('Updating settings for', effectId, settings);
  };

  const getEffectClasses = () => {
    return activeEffects.map(effectId => {
      const effect = mockEffects.find(e => e.id === effectId);
      return effect?.cssClass || '';
    }).join(' ');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Card Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Card Preview</h3>
        <div className={`relative aspect-[2.5/3.5] max-w-sm mx-auto ${getEffectClasses()}`}>
          <img 
            src={card.imageUrl} 
            alt={card.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Effects Controls */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Available Effects</h3>
        
        <div className="space-y-3">
          {mockEffects.map((effect) => (
            <div key={effect.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={activeEffects.includes(effect.id)}
                    onChange={() => toggleEffect(effect.id)}
                    className="rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{effect.name}</h4>
                    <p className="text-sm text-gray-600">{effect.description}</p>
                  </div>
                </div>
                {effect.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>
              
              {activeEffects.includes(effect.id) && effect.settings && (
                <div className="mt-3 pt-3 border-t">
                  <h5 className="text-sm font-medium mb-2">Settings</h5>
                  <div className="space-y-2">
                    {Object.entries(effect.settings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <label className="text-sm">{key}</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={typeof value === 'number' ? value : 0}
                          onChange={(e) => updateEffectSettings(effect.id, {
                            ...effect.settings,
                            [key]: parseFloat(e.target.value)
                          })}
                          className="w-20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardEffectsDemo;
