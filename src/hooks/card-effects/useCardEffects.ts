
import { useState, useEffect, useCallback } from 'react';
import { PremiumCardEffect, CardEffectSettings, UseCardEffectsResult, EffectCategory } from './types';
import { getBasicEffects, getEffectCategories } from './utils';

export const useCardEffects = (): UseCardEffectsResult => {
  const [effects, setEffects] = useState<PremiumCardEffect[]>([]);
  const [categories, setCategories] = useState<EffectCategory[]>([]);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [effectsLoading, setEffectsLoading] = useState(true);

  // Initialize effects
  useEffect(() => {
    const loadEffects = async () => {
      try {
        // In a real app, this might be an API call
        const allEffects = getBasicEffects();
        setEffects(allEffects);
        
        // Extract unique categories from effects
        const uniqueCategories = [...new Set(allEffects.map(effect => effect.category))];
        setCategories(uniqueCategories);
        
        setEffectsLoading(false);
      } catch (error) {
        console.error('Failed to load effects:', error);
        setEffectsLoading(false);
      }
    };

    loadEffects();
  }, []);

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
    setEffects(prev => prev.map(effect => {
      if (effect.id === effectId) {
        return {
          ...effect,
          settings: {
            ...effect.settings,
            ...settings
          }
        };
      }
      return effect;
    }));
  }, []);

  // Apply effects to a DOM element
  const applyEffectsToElement = useCallback((element: HTMLElement) => {
    // Clear existing effect classes
    element.className = element.className.replace(/effect-\w+/g, '');
    
    // Apply active effects
    activeEffects.forEach(effectId => {
      const effect = effects.find(e => e.id === effectId);
      if (effect && effect.enabled) {
        if (effect.className) {
          element.classList.add(effect.className);
        }
        
        // Apply settings as CSS custom properties
        Object.entries(effect.settings).forEach(([key, value]) => {
          element.style.setProperty(`--${key}`, String(value));
        });
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

export default useCardEffects;
