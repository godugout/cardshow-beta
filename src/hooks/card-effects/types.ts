
/**
 * Card Effects System Types
 */

export type EffectCategory = 'holographic' | 'prismatic' | 'refractor' | 'metallic' | 'vintage' | 'special' | 'premium' | 'foil' | 'classic' | 'modern';

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

// Add CardEffectDefinition for compatibility
export interface CardEffectDefinition extends PremiumCardEffect {
  displayName?: string;
  thumbnailUrl?: string;
}

// Material simulation types
export interface MaterialSimulation {
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  ior: number;
  transmission: number;
  reflectivity: number;
  emissive: string;
  envMapIntensity: number;
  
  // Additional properties needed by MaterialSimulator component
  textureUrl?: string;
  baseColor?: string;
  type?: string;
  weathering?: number;
}

export interface UseCardEffectsResult {
  effects: PremiumCardEffect[];
  categories: EffectCategory[];
  activeEffects: string[];
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: Partial<CardEffectSettings>) => void;
  applyEffectsToElement: (element: HTMLElement) => void;
  effectsLoading: boolean;
}

// Effect category interface for utils
export interface EffectCategoryInfo {
  id: string;
  name: string;
  description: string;
  effects: PremiumCardEffect[];
}
