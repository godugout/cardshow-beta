
/**
 * Card Effects System Types
 */

export type EffectCategory = 'holographic' | 'prismatic' | 'refractor' | 'metallic' | 'vintage' | 'special';

export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  scale?: number;
  rotation?: number;
  [key: string]: any;
}

export interface PremiumCardEffect {
  id: string;
  name: string;
  description: string;
  category: EffectCategory;
  enabled: boolean;
  settings: CardEffectSettings;
  className?: string;
  iconUrl?: string;
  isPremium?: boolean;
  previewUrl?: string;
}

// Re-export as CardEffect for backward compatibility
export type CardEffect = PremiumCardEffect;

export interface UseCardEffectsResult {
  effects: PremiumCardEffect[];
  categories: EffectCategory[];
  activeEffects: string[];
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: Partial<CardEffectSettings>) => void;
  applyEffectsToElement: (element: HTMLElement) => void;
  effectsLoading: boolean;
}
