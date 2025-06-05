
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
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  description?: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  fontFamily: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  typography?: {
    fontFamily: string;
    headingFont?: string;
  };
  assets?: {
    logos: string[];
    backgrounds: string[];
    elements: string[];
  };
  templates?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowConfig {
  autoSave: boolean;
  defaultTemplate: string;
  showTutorials: boolean;
  shortcuts: Record<string, string>;
  defaultView?: 'simple' | 'advanced' | 'expert';
  layoutPreferences?: {
    visiblePanels: string[];
    collapsedPanels: string[];
    sidebarPosition: 'left' | 'right';
    panelSizes: {
      main: number;
      sidebar: number;
    };
  };
  quickAccessTools?: string[];
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
  workflow?: WorkflowConfig;
  recommendationsEnabled?: boolean;
  recommendationPreferences?: {
    showTemplateRecommendations: boolean;
    showEffectRecommendations: boolean;
    showColorRecommendations: boolean;
    showElementRecommendations: boolean;
  };
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

