
import React, { createContext, useContext, ReactNode } from 'react';
import { usePersonalization } from '@/hooks/usePersonalization';
import { UserPreferences, ColorPalette, WorkflowConfig, BrandProfile, RecommendationItem, UserStyleProfile } from '@/lib/types/userPreferences';
import { CardTemplate } from '@/lib/types/templateTypes';
import { CardEffect } from '@/lib/types/cardTypes';
import { CardElement } from '@/lib/types/cardElements';

// Define the context type
interface PersonalizationContextType {
  loading: boolean;
  preferences: UserPreferences | null;
  activeBrandProfile: BrandProfile | null;
  styleProfile: UserStyleProfile | null;
  toggleFavorite: (type: 'template' | 'effect' | 'element', itemId: string) => Promise<boolean>;
  createColorPalette: (palette: Omit<ColorPalette, 'id' | 'isSystem' | 'createdAt' | 'updatedAt'>) => Promise<ColorPalette>;
  createBrandProfile: (profile: Omit<BrandProfile, 'id' | 'createdAt' | 'updatedAt'>) => Promise<BrandProfile>;
  setActiveBrand: (profileId: string) => Promise<void>;
  recordCardCreation: (cardId: string, templateId: string | undefined, effectsUsed: string[], elementsUsed: string[], timeSpent: number) => Promise<void>;
  getTemplateRecommendations: (imageUrl: string, availableTemplates: CardTemplate[]) => Promise<RecommendationItem<CardTemplate>[]>;
  getEffectRecommendations: (imageUrl: string, availableEffects: CardEffect[]) => Promise<RecommendationItem<CardEffect>[]>;
  getElementRecommendations: (context: { imageUrl: string; templateId?: string; cardTitle?: string; tags?: string[]; }, availableElements: CardElement[]) => Promise<RecommendationItem<CardElement>[]>;
  getColorRecommendations: (imageUrl: string) => Promise<string[][]>;
  updateWorkflow: (updates: Partial<WorkflowConfig>) => Promise<WorkflowConfig>;
}

// Create the context
const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

// Provider component
export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const personalization = usePersonalization();
  
  // Create mock preferences
  const mockPreferences: UserPreferences = {
    userId: 'mock-user',
    styleProfile: personalization.styleProfile || {
      userId: 'mock-user',
      preferredColors: [],
      preferredEffects: [],
      favoriteEffects: [],
      favoriteTemplates: [],
      favoriteElements: [],
      styleCategories: [],
      stylePreferences: {
        classicVsModern: 0.5,
        colorfulVsMinimal: 0.5,
        boldVsSubtle: 0.5,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    brandProfiles: [],
    activeBrandId: undefined,
    activeBrandProfileId: undefined,
    colorPalettes: [
      {
        id: 'default-palette',
        name: 'Default Colors',
        colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
        isSystem: true,
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    workflowConfig: {
      id: 'default-workflow',
      name: 'Default Workflow',
      steps: [],
      shortcuts: {},
      autoSave: true,
      defaultSettings: {},
      defaultView: 'simple',
      quickAccessTools: ['upload', 'effects', 'text', 'download'],
      layoutPreferences: {
        sidebarPosition: 'right',
        visiblePanels: ['tools', 'properties'],
        collapsedPanels: [],
        panelSizes: {
          main: 70,
          sidebar: 30,
        },
      },
    },
    workflow: {
      id: 'default-workflow',
      name: 'Default Workflow',
      steps: [],
      shortcuts: {},
      autoSave: true,
      defaultSettings: {},
      defaultView: 'simple',
      quickAccessTools: ['upload', 'effects', 'text', 'download'],
      layoutPreferences: {
        sidebarPosition: 'right',
        visiblePanels: ['tools', 'properties'],
        collapsedPanels: [],
        panelSizes: {
          main: 70,
          sidebar: 30,
        },
      },
    },
    favoriteTemplates: [],
    favoriteEffects: [],
    favoriteElements: [],
    recommendationsEnabled: true,
    recommendationPreferences: {
      showTemplateRecommendations: true,
      showEffectRecommendations: true,
      showColorRecommendations: true,
      showElementRecommendations: true,
    },
    creationHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const contextValue: PersonalizationContextType = {
    loading: personalization.isLoading,
    preferences: mockPreferences,
    activeBrandProfile: null,
    styleProfile: personalization.styleProfile,
    toggleFavorite: async () => true,
    createColorPalette: async (palette) => ({
      id: 'new-palette',
      name: palette.name,
      colors: palette.colors,
      isSystem: false,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    createBrandProfile: async (profile) => ({
      id: 'new-brand',
      name: profile.name,
      description: profile.description,
      primaryColor: profile.primaryColor,
      secondaryColor: profile.secondaryColor,
      fontFamily: profile.fontFamily,
      colorPalettes: profile.colorPalettes,
      templateIds: profile.templateIds,
      effectIds: profile.effectIds,
      elementIds: profile.elementIds,
      isActive: profile.isActive,
      colors: profile.colors,
      typography: profile.typography,
      assets: profile.assets,
      templates: profile.templates,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    setActiveBrand: async () => {},
    recordCardCreation: async () => {},
    getTemplateRecommendations: async () => [],
    getEffectRecommendations: async () => [],
    getElementRecommendations: async () => [],
    getColorRecommendations: async () => [],
    updateWorkflow: async (updates) => ({
      ...mockPreferences.workflowConfig,
      ...updates,
    }),
  };
  
  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
}

// Custom hook to use the context
export function usePersonalizationContext() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalizationContext must be used within a PersonalizationProvider');
  }
  return context;
}
