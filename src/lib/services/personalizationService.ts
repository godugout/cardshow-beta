
import { Card } from '@/lib/types/cardTypes';
import { CreationHistoryItem, UserStyleProfile, UserPreferences, ColorPalette, BrandProfile, WorkflowConfig } from '@/lib/types/userPreferences';
import { v4 as uuidv4 } from 'uuid';

export class PersonalizationService {
  private userId: string;
  private userProfiles: Map<string, UserStyleProfile> = new Map();
  private creationHistory: Map<string, CreationHistoryItem[]> = new Map();
  private userPreferences: Map<string, UserPreferences> = new Map();

  constructor(userId: string = 'guest') {
    this.userId = userId;
  }

  async getUserStyleProfile(): Promise<UserStyleProfile | undefined> {
    return this.userProfiles.get(this.userId);
  }

  async createUserStyleProfile(): Promise<UserStyleProfile> {
    const newProfile: UserStyleProfile = {
      userId: this.userId,
      preferredColors: [],
      preferredEffects: [],
      favoriteTemplates: [],
      favoriteElements: [],
      styleCategories: [],
      stylePreferences: {
        classicVsModern: 50,
        colorfulVsMinimal: 50,
        boldVsSubtle: 50
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.userProfiles.set(this.userId, newProfile);
    return newProfile;
  }

  async loadUserPreferences(): Promise<UserPreferences> {
    let prefs = this.userPreferences.get(this.userId);
    if (!prefs) {
      prefs = {
        id: uuidv4(),
        userId: this.userId,
        favoriteTemplates: [],
        favoriteEffects: [],
        favoriteElements: [],
        colorPalettes: [],
        brandProfiles: [],
        workflowConfig: {
          autoSave: true,
          defaultTemplate: 'classic',
          showTutorials: true,
          shortcuts: {}
        },
        creationHistory: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.userPreferences.set(this.userId, prefs);
    }
    return prefs;
  }

  async getActiveBrandProfile(): Promise<BrandProfile | null> {
    const prefs = await this.loadUserPreferences();
    if (prefs.activeBrandProfileId) {
      return prefs.brandProfiles.find(p => p.id === prefs.activeBrandProfileId) || null;
    }
    return null;
  }

  async toggleFavorite(type: 'template' | 'effect' | 'element', itemId: string): Promise<boolean> {
    const prefs = await this.loadUserPreferences();
    const key = `favorite${type.charAt(0).toUpperCase() + type.slice(1)}s` as keyof Pick<UserPreferences, 'favoriteTemplates' | 'favoriteEffects' | 'favoriteElements'>;
    const favorites = prefs[key] as string[];
    
    const index = favorites.indexOf(itemId);
    if (index > -1) {
      favorites.splice(index, 1);
      return false;
    } else {
      favorites.push(itemId);
      return true;
    }
  }

  async createColorPalette(palette: Omit<ColorPalette, 'id' | 'isSystem' | 'createdAt' | 'updatedAt'>): Promise<ColorPalette> {
    const newPalette: ColorPalette = {
      ...palette,
      id: uuidv4(),
      isSystem: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const prefs = await this.loadUserPreferences();
    prefs.colorPalettes.push(newPalette);
    return newPalette;
  }

  async createBrandProfile(profile: Omit<BrandProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<BrandProfile> {
    const newProfile: BrandProfile = {
      ...profile,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const prefs = await this.loadUserPreferences();
    prefs.brandProfiles.push(newProfile);
    return newProfile;
  }

  async setActiveBrandProfile(profileId: string): Promise<void> {
    const prefs = await this.loadUserPreferences();
    prefs.activeBrandProfileId = profileId;
  }

  async addToHistory(item: Omit<CreationHistoryItem, 'id' | 'createdAt'>): Promise<void> {
    const historyItem: CreationHistoryItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };

    const userHistory = this.creationHistory.get(this.userId) || [];
    userHistory.push(historyItem);
    this.creationHistory.set(this.userId, userHistory);
  }

  async updateWorkflowConfig(updates: Partial<WorkflowConfig>): Promise<WorkflowConfig> {
    const prefs = await this.loadUserPreferences();
    prefs.workflowConfig = { ...prefs.workflowConfig, ...updates };
    return prefs.workflowConfig;
  }

  async recordColorPreference(color: string): Promise<void> {
    const profile = this.userProfiles.get(this.userId) || await this.createUserStyleProfile();
    if (!profile.preferredColors.includes(color)) {
      profile.preferredColors.push(color);
      this.userProfiles.set(this.userId, profile);
    }
  }

  async analyzeCardColors(card: Card): Promise<string[]> {
    const colors: string[] = [];

    if (card.designMetadata?.cardStyle?.backgroundColor) {
      colors.push(card.designMetadata.cardStyle.backgroundColor);
    }

    if (card.designMetadata?.textStyle?.color) {
      colors.push(card.designMetadata.textStyle.color);
    }

    return colors;
  }

  async recordCreationHistory(
    cardId: string,
    effectsUsed: string[],
    elementsUsed: string[],
    timeSpent: number
  ): Promise<void> {
    const historyItem: CreationHistoryItem = {
      id: uuidv4(),
      cardId,
      effectsUsed,
      elementsUsed,
      timeSpent,
      createdAt: new Date().toISOString()
    };

    const userHistory = this.creationHistory.get(this.userId) || [];
    userHistory.push(historyItem);
    this.creationHistory.set(this.userId, userHistory);
  }

  async getCreationHistory(): Promise<CreationHistoryItem[]> {
    return this.creationHistory.get(this.userId) || [];
  }

  async clearCreationHistory(): Promise<void> {
    this.creationHistory.delete(this.userId);
  }
}

export const personalizationService = new PersonalizationService();
