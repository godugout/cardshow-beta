
import { useState, useEffect } from 'react';
import { CardTemplate } from '@/lib/types/templateTypes';
import { CardElement } from '@/lib/types/cardElements';
import { UserStyleProfile, RecommendationItem } from '@/lib/types/userPreferences';
import { personalizationService } from '@/lib/services/personalizationService';
import { templateLibrary } from '@/components/card-templates/TemplateLibrary';

export function usePersonalization(userId?: string) {
  const [styleProfile, setStyleProfile] = useState<UserStyleProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      loadStyleProfile();
    }
  }, [userId]);

  const loadStyleProfile = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const profile = await personalizationService.getUserStyleProfile(userId);
      setStyleProfile(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load style profile');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserStyleProfile>) => {
    if (!userId || !styleProfile) return;
    
    try {
      const updatedProfile = await personalizationService.updateStyleProfile(userId, updates);
      setStyleProfile(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
    }
  };

  const getRecommendedTemplates = (limit: number = 5): RecommendationItem<CardTemplate>[] => {
    const allTemplates = templateLibrary.getAllTemplates();
    
    // Convert to the expected type structure
    return allTemplates.slice(0, limit).map(template => ({
      item: {
        ...template,
        thumbnail: template.thumbnail || '/placeholder.jpg', // Ensure thumbnail is present
        designDefaults: template.designDefaults || { // Ensure designDefaults is present
          cardStyle: {
            template: 'classic',
            effect: 'none',
            borderRadius: '8px',
            borderColor: '#000000',
            frameColor: '#000000',
            frameWidth: 2,
            shadowColor: 'rgba(0,0,0,0.2)'
          }
        }
      },
      score: Math.random(), // Mock scoring
      reason: 'Based on your preferences'
    }));
  };

  const getRecommendedElements = (limit: number = 5): RecommendationItem<CardElement>[] => {
    // Mock implementation
    return [];
  };

  return {
    styleProfile,
    isLoading,
    error,
    updatePreferences,
    getRecommendedTemplates,
    getRecommendedElements,
    loadStyleProfile
  };
}
