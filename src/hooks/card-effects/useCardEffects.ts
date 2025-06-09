
import { useState, useCallback } from 'react';
import { PremiumCardEffect, CardEffectsResult } from '@/lib/types/cardEffects';

const AVAILABLE_EFFECTS: PremiumCardEffect[] = [
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Creates a shimmering holographic effect',
    category: 'Premium',
    isPremium: true,
    tier: 'premium',
    cssClass: 'holographic-effect',
    price: 5.99
  },
  {
    id: 'refractor',
    name: 'Refractor',
    description: 'Light refraction effect with rainbow colors',
    category: 'Premium',
    isPremium: true,
    tier: 'premium',
    cssClass: 'refractor-effect',
    price: 3.99
  },
  {
    id: 'chrome',
    name: 'Chrome',
    description: 'Metallic chrome finish',
    category: 'Basic',
    isPremium: false,
    tier: 'basic',
    cssClass: 'chrome-effect'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic vintage appearance',
    category: 'Basic',
    isPremium: false,
    tier: 'basic',
    cssClass: 'vintage-effect'
  }
];

export const useCardEffects = (): CardEffectsResult => {
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [effectIntensities, setEffectIntensities] = useState<Record<string, number>>({});

  const toggleEffect = useCallback((effectId: string) => {
    setActiveEffects(prev => 
      prev.includes(effectId) 
        ? prev.filter(id => id !== effectId)
        : [...prev, effectId]
    );
  }, []);

  const applyEffect = useCallback((effectId: string) => {
    setActiveEffects(prev => 
      prev.includes(effectId) ? prev : [...prev, effectId]
    );
  }, []);

  const removeEffect = useCallback((effectId: string) => {
    setActiveEffects(prev => prev.filter(id => id !== effectId));
  }, []);

  const isEffectActive = useCallback((effectId: string) => {
    return activeEffects.includes(effectId);
  }, [activeEffects]);

  const getEffectIntensity = useCallback((effectId: string) => {
    return effectIntensities[effectId] || 0.5;
  }, [effectIntensities]);

  const setEffectIntensity = useCallback((effectId: string, intensity: number) => {
    setEffectIntensities(prev => ({ ...prev, [effectId]: intensity }));
  }, []);

  const clearEffects = useCallback(() => {
    setActiveEffects([]);
    setEffectIntensities({});
  }, []);

  return {
    availableEffects: AVAILABLE_EFFECTS,
    activeEffects,
    setActiveEffects,
    toggleEffect,
    applyEffect,
    removeEffect,
    isEffectActive,
    getEffectIntensity,
    setEffectIntensity,
    clearEffects,
  };
};

export default useCardEffects;
