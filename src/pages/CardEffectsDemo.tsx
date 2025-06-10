import React, { useState } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

const CardEffectsDemo = () => {
  const [selectedEffects, setSelectedEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic')
  ]);

  const handleEffectChange = (effectType: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedEffects(prev => [...prev, stringToCardEffect(effectType)]);
    } else {
      setSelectedEffects(prev => prev.filter(effect => effect.type !== effectType));
    }
  };

  return (
    <div>
      <h1>Card Effects Demo</h1>
      <div>
        <label>
          <input
            type="checkbox"
            value="holographic"
            checked={selectedEffects.some(effect => effect.type === 'holographic')}
            onChange={e => handleEffectChange('holographic', e.target.checked)}
          />
          Holographic
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="refractor"
            checked={selectedEffects.some(effect => effect.type === 'refractor')}
            onChange={e => handleEffectChange('refractor', e.target.checked)}
          />
          Refractor
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="prismatic"
            checked={selectedEffects.some(effect => effect.type === 'prismatic')}
            onChange={e => handleEffectChange('prismatic', e.target.checked)}
          />
          Prismatic
        </label>
      </div>
      <div>
        <h2>Active Effects:</h2>
        <ul>
          {selectedEffects.map(effect => (
            <li key={effect.id}>{effect.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardEffectsDemo;
