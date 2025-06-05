
import { CardTemplate } from './templateTypes';
import { CardEffect } from './cardTypes';
import { CardElement } from './cardElements';

// Base preference data interface
export interface PreferenceData {
  type: 'template' | 'effect' | 'element' | 'color';
  itemId: string;
  action: 'like' | 'dislike' | 'favorite' | 'use';
  context?: string;
  timestamp: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowConfig {
  id: string;
  name: string;
  steps: string[];
  shortcuts: Record<string, string>;
  autoSave: boolean;
  defaultSettings: Record<string, any>;
}

export interface BrandProfile {
  id: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  colorPalettes: ColorPalette[];
  templateIds: string[];
  effectIds: string[];
  elementIds: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStyleProfile {
  userId: string;
  preferredColors: string[];
  preferredEffects: string[];
  favoriteEffects: string[];
  favoriteTemplates: string[];
  favoriteElements: string[];
  styleCategories: string[];
  stylePreferences: {
    classicVsModern: number;
    colorfulVsMinimal: number;
    boldVsSubtle: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  styleProfile: UserStyleProfile;
  brandProfiles: BrandProfile[];
  activeBrandId?: string;
  colorPalettes: ColorPalette[];
  workflowConfig: WorkflowConfig;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationItem<T> {
  item: T;
  score: number;
  reason: string;
}
