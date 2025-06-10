
import { CardEffect } from '@/lib/types/core';

export function stringToCardEffect(effectString: string): CardEffect {
  return {
    id: `effect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: mapStringToEffectType(effectString),
    intensity: 0.7,
    name: effectString,
    enabled: true,
    settings: {},
    className: `${effectString.toLowerCase()}-effect`
  };
}

export function stringArrayToCardEffects(effects: string[]): CardEffect[] {
  return effects.map(stringToCardEffect);
}

export function cardEffectsToStringArray(effects: CardEffect[]): string[] {
  return effects.map(effect => effect.name || effect.type);
}

function mapStringToEffectType(effectString: string): CardEffect['type'] {
  const lowerEffect = effectString.toLowerCase();
  
  if (lowerEffect.includes('holographic') || lowerEffect.includes('holo')) return 'holographic';
  if (lowerEffect.includes('prismatic')) return 'prismatic';
  if (lowerEffect.includes('refractor')) return 'refractor';
  if (lowerEffect.includes('sparkle')) return 'sparkle';
  if (lowerEffect.includes('foil')) return 'foil';
  if (lowerEffect.includes('rainbow')) return 'rainbow';
  
  return 'custom';
}
