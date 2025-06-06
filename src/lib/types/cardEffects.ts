
import { CardEffectSettings } from './cardTypes';

export interface CardEffect {
  id: string;
  name: string;
  enabled: boolean;
  settings: CardEffectSettings;
  className?: string;
}

export interface PremiumCardEffect extends Omit<CardEffect, 'enabled'> {
  enabled?: boolean;
  isPremium: boolean;
  tier: 'basic' | 'premium' | 'exclusive';
  unlockLevel?: number;
}

export interface EffectPreset {
  id: string;
  name: string;
  effects: CardEffect[];
  thumbnail?: string;
}

export interface CardEffectsResult {
  availableEffects: PremiumCardEffect[];
  premiumEffects: PremiumCardEffect[];
  activeEffects: string[];
  appliedClasses: string;
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: any) => void;
  clearAllEffects: () => void;
  getEffectSettings: (effectId: string) => any;
  cssClasses: string;
  effectData: Record<string, any>;
}

// Export CardEffectSettings for external use
export type { CardEffectSettings } from './cardTypes';
