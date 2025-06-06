
export interface PremiumCardEffect {
  id: string;
  name: string;
  description: string;
  premium: boolean;
  category: string;
  iconUrl?: string;
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
}
