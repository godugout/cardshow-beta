
import { CardTemplate } from './cardTypes';
import { CardEffect } from './cardTypes';
import { CardElement } from './cardElements';

export interface UserStyleProfile {
  userId: string;
  preferredColors: string[];
  preferredEffects: string[];
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

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  fontFamily: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowConfig {
  autoSave: boolean;
  defaultTemplate: string;
  showTutorials: boolean;
  shortcuts: Record<string, string>;
}

export interface UserPreferences {
  id: string;
  userId: string;
  favoriteTemplates: string[];
  favoriteEffects: string[];
  favoriteElements: string[];
  colorPalettes: ColorPalette[];
  brandProfiles: BrandProfile[];
  activeBrandProfileId?: string;
  workflowConfig: WorkflowConfig;
  creationHistory: CreationHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreationHistoryItem {
  id: string;
  cardId: string;
  templateId?: string;
  effectsUsed: string[];
  elementsUsed: string[];
  timeSpent: number;
  createdAt: string;
}

export interface RecommendationItem<T> {
  item: T;
  score: number;
  reason: string;
  category?: string;
}
