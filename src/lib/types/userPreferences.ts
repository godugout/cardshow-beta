
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
  isDefault?: boolean;
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
  defaultView?: 'simple' | 'advanced' | 'expert';
  quickAccessTools: string[];
  layoutPreferences: {
    sidebarPosition: 'left' | 'right';
    visiblePanels: string[];
    collapsedPanels: string[];
    panelSizes: {
      main: number;
      sidebar: number;
    };
  };
}

export interface BrandProfile {
  id: string;
  name: string;
  description?: string;
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
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
  };
  assets: {
    logos: string[];
    backgrounds: string[];
    elements: string[];
  };
  templates: string[];
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

export interface CreationHistoryItem {
  id: string;
  cardId: string;
  templateId?: string;
  effectsUsed: string[];
  elementsUsed: string[];
  timeSpent: number;
  createdAt: string;
}

export interface UserPreferences {
  userId: string;
  styleProfile: UserStyleProfile;
  brandProfiles: BrandProfile[];
  activeBrandId?: string;
  activeBrandProfileId?: string;
  colorPalettes: ColorPalette[];
  workflowConfig: WorkflowConfig;
  workflow: WorkflowConfig;
  favoriteTemplates: string[];
  favoriteEffects: string[];
  favoriteElements: string[];
  recommendationsEnabled: boolean;
  recommendationPreferences: {
    showTemplateRecommendations: boolean;
    showEffectRecommendations: boolean;
    showColorRecommendations: boolean;
    showElementRecommendations: boolean;
  };
  creationHistory: CreationHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationItem<T> {
  item: T;
  score: number;
  reason: string;
}
