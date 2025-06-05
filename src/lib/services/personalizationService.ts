import { Card } from '@/lib/types/cardTypes';
import { CreationHistoryItem, UserStyleProfile } from '@/lib/types/ugcTypes';
import { v4 as uuidv4 } from 'uuid';

export class PersonalizationService {
  private userProfiles: Map<string, UserStyleProfile> = new Map();
  private creationHistory: Map<string, CreationHistoryItem[]> = new Map();

  async getUserStyleProfile(userId: string): Promise<UserStyleProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async createUserStyleProfile(userId: string): Promise<UserStyleProfile> {
    const newProfile: UserStyleProfile = {
      userId,
      preferredColors: [],
      preferredEffects: [],
      favoriteTemplates: [],
      styleCategories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.userProfiles.set(userId, newProfile);
    return newProfile;
  }

  async updateUserStyleProfile(userId: string, updates: Partial<UserStyleProfile>): Promise<UserStyleProfile | undefined> {
    const existingProfile = this.userProfiles.get(userId);
    if (!existingProfile) {
      return undefined;
    }

    const updatedProfile: UserStyleProfile = {
      ...existingProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.userProfiles.set(userId, updatedProfile);
    return updatedProfile;
  }

  async recordColorPreference(userId: string, color: string): Promise<void> {
    const profile = this.userProfiles.get(userId) || await this.createUserStyleProfile(userId);
    if (!profile.preferredColors.includes(color)) {
      profile.preferredColors.push(color);
      this.userProfiles.set(userId, profile);
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
    userId: string,
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

    const userHistory = this.creationHistory.get(userId) || [];
    userHistory.push(historyItem);
    this.creationHistory.set(userId, userHistory);
  }

  async getCreationHistory(userId: string): Promise<CreationHistoryItem[]> {
    return this.creationHistory.get(userId) || [];
  }

  async clearCreationHistory(userId: string): Promise<void> {
    this.creationHistory.delete(userId);
  }
}

export const personalizationService = new PersonalizationService();
