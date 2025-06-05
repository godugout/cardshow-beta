
import { useState, useCallback, useMemo } from 'react';
import { PremiumCardEffect, EffectCategory, CardEffectSettings, UseCardEffectsResult } from './types';
import { getBasicEffects, getEffectCategories, applyEffectToElement } from './utils';

export const useCardEffects = (): UseCardEffectsResult => {
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [effectsLoading, setEffectsLoading] = useState(false);

  // Get all available effects
  const effects = useMemo(() => getBasicEffects(), []);
  const categories = useMemo(() => getEffectCategories(), []);

  const toggleEffect = useCallback((effectId: string) => {
    setActiveEffects(prev => {
      if (prev.includes(effectId)) {
        return prev.filter(id => id !== effectId);
      } else {
        return [...prev, effectId];
      }
    });
  }, []);

  const updateEffectSettings = useCallback((effectId: string, settings: Partial<CardEffectSettings>) => {
    // Find the effect and update its settings
    const effectIndex = effects.findIndex(e => e.id === effectId);
    if (effectIndex !== -1) {
      effects[effectIndex].settings = {
        ...effects[effectIndex].settings,
        ...settings
      };
    }
  }, [effects]);

  const applyEffectsToElement = useCallback((element: HTMLElement) => {
    if (!element) return;
    
    // Clear existing effects
    element.className = element.className.replace(/effect-\w+/g, '');
    
    // Apply active effects
    activeEffects.forEach(effectId => {
      const effect = effects.find(e => e.id === effectId);
      if (effect) {
        applyEffectToElement(element, effectId, effect.settings);
      }
    });
  }, [activeEffects, effects]);

  return {
    effects,
    categories,
    activeEffects,
    toggleEffect,
    updateEffectSettings,
    applyEffectsToElement,
    effectsLoading
  };
};
