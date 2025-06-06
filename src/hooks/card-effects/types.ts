
/**
 * Card Effects Types Module
 */
import { ReactNode } from 'react';
import { JsonValue } from '@/lib/types/index';
import { CardEffect, CardEffectSettings } from '@/lib/types/cardTypes';

export interface PremiumCardEffect {
  id: string;
  name: string;
  description: string;
  premium: boolean;
  category: string;
  iconUrl?: string;
  thumbnail?: string;
  previewUrl?: string;
  className: string;
  settings: CardEffectSettings;
  dependencies?: string[];
  enabled?: boolean;
  type?: 'shader' | 'css' | 'canvas' | 'webgl';
  cssClass?: string;
  supportedCardTypes?: string[];
  defaultSettings?: any;
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
  jsxElements?: ReactNode[];
}

export interface EffectEngine {
  engine: any;
  activeEffects: PremiumCardEffect[];
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: any) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cardRef: React.RefObject<HTMLDivElement>;
  effects: Map<string, CardEffect>;
  compositor: EffectCompositor;
  renderer: WebGLRenderer;
  preview: PreviewGenerator;
  addEffect: (effect: CardEffect) => void;
  removeEffect: (id: string) => void;
  applyEffects: (cardElement: HTMLElement, effects: CardEffect[]) => void;
  updateSettings: (id: string, settings: any) => void;
  getEffectById: (id: string) => CardEffect | undefined;
  createPreset: (name: string, effects: CardEffect[]) => string;
  loadPreset: (presetId: string) => CardEffect[];
}

export interface UseCardEffectsResult {
  cardEffects: Record<string, string[]>;
  activeEffects: string[];
  setActiveEffects: (effects: string[]) => void;
  addEffect: (cardId: string, effect: string) => void;
  removeEffect: (cardId: string, effect: string) => void;
  toggleEffect: (effectId: string) => void;
  updateEffectSettings: (effectId: string, settings: any) => void;
  clearAllEffects: () => void;
  getEffectSettings: (effectId: string) => any;
  setCardEffects: (cardId: string, effects: string[]) => void;
  clearEffects: (cardId: string) => void;
  availableEffects: PremiumCardEffect[];
  premiumEffects: PremiumCardEffect[];
  appliedClasses: string;
  cssClasses: string;
  effectData: Record<string, any>;
}

export interface CardEffectDefinition extends PremiumCardEffect {}

export interface MaterialSimulation {
  id: string;
  name: string;
  type: string;
  textureUrl?: string;
  baseColor?: string;
  weathering?: number;
  metallic?: number;
  metalness?: number;
  roughness?: number;
  normalIntensity?: number;
  emissive?: string;
  clearcoat?: number;
  clearcoatRoughness?: number;
  ior?: number;
  transmission?: number;
  reflectivity?: number;
  envMapIntensity?: number;
}

// Core effect engine interfaces
export interface EffectCompositor {
  compose(effects: CardEffect[]): CardEffectsResult;
  layerEffects(primary: CardEffect, secondary: CardEffect): CardEffect;
  getHtmlElement(): HTMLElement | null;
}

export interface WebGLRenderer {
  initialize(canvas: HTMLCanvasElement): void;
  applyShader(effect: CardEffect): void;
  render(): void;
  dispose(): void;
}

export interface PreviewGenerator {
  generateThumbnail(effect: CardEffect, size: { width: number; height: number }): Promise<string>;
  generatePreview(card: any, effects: CardEffect[]): ReactNode;
}

// Re-export CardEffect and related types
export type { CardEffect, CardEffectSettings };
