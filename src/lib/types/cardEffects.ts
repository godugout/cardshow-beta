
export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: any;
}

export interface CardEffect {
  id: string;
  name: string;
  enabled: boolean;
  settings: CardEffectSettings;
  className?: string;
}

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
  enabled?: boolean;
  settings?: CardEffectSettings;
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
  clearEffects: () => void;
  
  // Add missing properties for ImmersiveCardViewerPage
  cardEffects?: Record<string, string[]>;
  addEffect?: (cardId: string, effect: string) => void;
  setCardEffects?: (cardId: string, effects: string[]) => void;
  premiumEffects?: PremiumCardEffect[];
  appliedClasses?: string;
  cssClasses?: string;
  effectData?: Record<string, any>;
}
