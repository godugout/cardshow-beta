
import { Card, CardEffect } from '@/lib/types/cardTypes';

// Export CardEffectSettings for use by other modules
export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: any;
}

export interface EffectCategory {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface PremiumCardEffect extends CardEffect {
  premium: boolean;
  price?: number;
  category?: string;
  animationClass?: string;
  renderer?: () => React.ReactNode;
}

export interface CardEffectContextProps {
  activeEffects: string[];
  setActiveEffects: React.Dispatch<React.SetStateAction<string[]>>;
  effectIntensities: { [key: string]: number };
  setEffectIntensities: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  isEffectEnabled: (effectId: string) => boolean;
  toggleEffect: (effectId: string) => void;
  setEffectIntensity: (effectId: string, intensity: number) => void;
  getEffectIntensity: (effectId: string) => number;
  resetEffects: () => void;
  cardEffects: CardEffect[];
  premiumEffects: PremiumCardEffect[];
  getEffectSettings: (effectId: string) => CardEffectSettings | undefined;
  getEffectCategory: (effectId: string) => EffectCategory | undefined;
}

export interface MediaServiceHook {
  uploadFile: (file: File) => Promise<string>;
  uploadImage: (file: File) => Promise<string>; // Added uploadImage method
  getMedia: () => Promise<string[]>;
  isUploading: boolean;
  error: Error | null;
}

export interface EffectRendererProps {
  card: Card;
  intensity: number;
  settings: Record<string, any>;
}

export interface EffectRegistry {
  [key: string]: {
    name: string;
    description?: string;
    category?: string;
    icon?: React.ReactNode;
    renderer: (props: EffectRendererProps) => React.ReactNode;
    settings?: CardEffectSettings;
  };
}

// Export CardEffectDefinition interface
export interface CardEffectDefinition {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  defaultSettings: CardEffectSettings;
  cssClass: string;
  supportedCardTypes: string[];
  premium: boolean;
  enabled: boolean;
  iconUrl: string;
}

// Export MaterialSimulation interface
export interface MaterialSimulation {
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  ior?: number;
  transmission?: number;
  reflectivity?: number;
  emissive?: string;
  envMapIntensity?: number;
  textureUrl: string;
  baseColor: string;
  color: string;
  texture: string;
  type: string;
  weathering: number;
}
