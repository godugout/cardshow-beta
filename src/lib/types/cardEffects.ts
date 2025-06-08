
export interface PremiumCardEffect {
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  tier: 'basic' | 'premium' | 'ultra';
  cssClass: string;
  previewImage?: string;
  price?: number;
}

export interface CardEffectsResult {
  availableEffects: PremiumCardEffect[];
  activeEffects: string[];
  setActiveEffects: (effects: string[]) => void;
  toggleEffect: (effectId: string) => void;
  applyEffect: (effectId: string) => void;
  removeEffect: (effectId: string) => void;
  isEffectActive: (effectId: string) => boolean;
  getEffectIntensity: (effectId: string) => number;
  setEffectIntensity: (effectId: string, intensity: number) => void;
}
