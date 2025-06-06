
import { CardEffect, CardEffectsResult, EffectEngine } from '@/hooks/card-effects/types';
import { useRef } from 'react';

/**
 * Create a default implementation of the EffectEngine
 */
export const createDefaultEffectEngine = (): EffectEngine => {
  const effects = new Map<string, CardEffect>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  return {
    activeEffects: [],
    toggleEffect: (id: string) => {
      console.log('Toggle effect', id);
    },
    updateEffectSettings: (id: string, settings: any) => {
      console.log('Update effect settings', id, settings);
    },
    canvasRef,
    cardRef,
    
    // Base EffectEngine implementation
    effects,
    compositor: {
      compose: (effects: CardEffect[]): CardEffectsResult => ({ 
        availableEffects: [],
        premiumEffects: [],
        activeEffects: [],
        appliedClasses: '',
        toggleEffect: () => {},
        updateEffectSettings: () => {},
        clearAllEffects: () => {},
        getEffectSettings: () => ({}),
        cssClasses: '',
        effectData: {}
      }),
      layerEffects: (primary: CardEffect, secondary: CardEffect): CardEffect => primary,
      getHtmlElement: () => null
    },
    renderer: {
      initialize: (canvas: HTMLCanvasElement) => {},
      applyShader: (effect: CardEffect) => {},
      render: () => {},
      dispose: () => {}
    },
    preview: {
      generateThumbnail: async (effect: CardEffect, size: { width: number; height: number }) => '',
      generatePreview: (card: any, effects: CardEffect[]) => null
    },
    addEffect: (effect: CardEffect) => {
      effects.set(effect.id, effect);
    },
    removeEffect: (id: string) => {
      effects.delete(id);
    },
    applyEffects: (cardElement: HTMLElement, effects: CardEffect[]) => {},
    updateSettings: (id: string, settings: Partial<any>) => {},
    getEffectById: (id: string) => undefined,
    createPreset: (name: string, effects: CardEffect[]) => '',
    loadPreset: (presetId: string) => []
  };
};

export const useCardEffectsEngine = (): EffectEngine => {
  return createDefaultEffectEngine();
};
