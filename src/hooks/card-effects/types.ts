
export interface PremiumCardEffect {
  id: string;
  name: string;
  description: string;
  premium: boolean;
  category: string;
  iconUrl?: string;
  thumbnail?: string; // Add thumbnail property
  className: string;
  settings: {
    intensity?: number;
    speed?: number;
    pattern?: string;
    color?: string;
    animationEnabled?: boolean;
    [key: string]: any;
  };
  previewUrl?: string;
  dependencies?: string[];
  enabled?: boolean;
  type?: 'shader' | 'css' | 'canvas' | 'webgl';
  // Additional properties for effect registry
  cssClass?: string;
  supportedCardTypes?: string[];
  defaultSettings?: any;
}

export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: any;
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
}

export interface EffectEngine {
  engine: any;
  activeEffects: string[];
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: any) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  effects: Map<string, any>;
  compositor: any;
  renderer: any;
  preview: any;
  addEffect: (effect: any) => void;
  removeEffect: (id: string) => void;
  applyEffects: (cardElement: HTMLElement, effects: any[]) => void;
  updateSettings: (id: string, settings: any) => void;
  getEffectById: (id: string) => any;
  createPreset: (name: string, effects: any[]) => string;
  loadPreset: (presetId: string) => any[];
}

// Add missing exports for backward compatibility
export interface UseCardEffectsResult extends CardEffectsResult {}
export interface CardEffectDefinition extends PremiumCardEffect {}
export interface MaterialSimulation {
  id: string;
  name: string;
  type: string;
  textureUrl?: string;
  baseColor?: string;
  weathering?: number;
  metallic?: number;
  metalness?: number; // Add for compatibility
  roughness?: number;
  normalIntensity?: number;
  emissive?: string;
}
