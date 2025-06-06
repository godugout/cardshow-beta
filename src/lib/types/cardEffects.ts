
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
