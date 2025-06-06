
import { useState, useCallback, useEffect } from 'react';
import { UseCardEffectsResult, CardEffectSettings } from './types';

const useCardEffects = (): UseCardEffectsResult => {
  const [cardEffects, setCardEffects] = useState<Record<string, string[]>>({});
  const [effectSettings, setEffectSettings] = useState<Record<string, Record<string, CardEffectSettings>>>({});
  const [activeEffects, setActiveEffects] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedEffects = localStorage.getItem('cardEffects');
      const savedSettings = localStorage.getItem('effectSettings');
      
      if (savedEffects) {
        setCardEffects(JSON.parse(savedEffects));
      }
      
      if (savedSettings) {
        setEffectSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load saved effects:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cardEffects', JSON.stringify(cardEffects));
      localStorage.setItem('effectSettings', JSON.stringify(effectSettings));
    } catch (error) {
      console.error('Failed to save effects:', error);
    }
  }, [cardEffects, effectSettings]);

  const addEffect = useCallback((cardId: string, effect: string) => {
    setCardEffects(prev => {
      const currentEffects = prev[cardId] || [];
      if (currentEffects.includes(effect)) return prev;
      
      return {
        ...prev,
        [cardId]: [...currentEffects, effect]
      };
    });
  }, []);

  const removeEffect = useCallback((cardId: string, effect: string) => {
    setCardEffects(prev => {
      const currentEffects = prev[cardId] || [];
      return {
        ...prev,
        [cardId]: currentEffects.filter(e => e !== effect)
      };
    });
  }, []);

  const toggleEffect = useCallback((effectId: string) => {
    console.log('Toggle effect:', effectId);
  }, []);

  const updateEffectSettings = useCallback((effectId: string, settings: any) => {
    console.log('Update effect settings:', effectId, settings);
  }, []);

  const setCardEffectsArray = useCallback((cardId: string, effects: string[]) => {
    setCardEffects(prev => ({
      ...prev,
      [cardId]: [...effects]
    }));
  }, []);

  const clearEffects = useCallback((cardId: string) => {
    setCardEffects(prev => ({
      ...prev,
      [cardId]: []
    }));
  }, []);

  const getEffectSettings = useCallback((effectId: string): any => {
    // This implementation matches the CardEffectsResult interface signature
    return {};
  }, [effectSettings]);

  const getCardEffectSettings = useCallback((
    cardId: string,
    effect: string
  ): CardEffectSettings | undefined => {
    return effectSettings[cardId]?.[effect];
  }, [effectSettings]);

  const clearAllEffects = useCallback(() => {
    // Clear all effects from all cards
    setCardEffects({});
    setEffectSettings({});
    setActiveEffects([]);
  }, []);

  return {
    cardEffects,
    activeEffects,
    setActiveEffects,
    addEffect,
    removeEffect,
    toggleEffect,
    updateEffectSettings,
    clearAllEffects,
    getEffectSettings,
    setCardEffects: setCardEffectsArray,
    clearEffects,
    availableEffects: [],
    premiumEffects: [],
    appliedClasses: '',
    cssClasses: '',
    effectData: {}
  };
};

export default useCardEffects;
