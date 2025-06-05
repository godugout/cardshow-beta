
/**
 * Core card creation types for the CRD application
 */

import { JsonValue } from '@/lib/types';
// Import the consolidated CardLayer from main types
export type { CardLayer, CardEffect } from '@/lib/types/cardTypes';

export interface CardDesignState {
  title: string;
  description: string;
  tags: string[];
  borderColor: string;
  backgroundColor: string;
  borderRadius: string;
  imageUrl: string | null;
  player?: string;
  team?: string;
  year?: string;
  [key: string]: any;
}

export interface CardEffectSettings {
  intensity?: number;
  speed?: number;
  pattern?: string;
  color?: string;
  animationEnabled?: boolean;
  [key: string]: any;
}
