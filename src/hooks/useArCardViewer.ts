
import { useState, useCallback } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

export const useArCardViewer = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic')
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardSelect = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  const handleEffectToggle = useCallback((effectName: string) => {
    const newEffect = stringToCardEffect(effectName);
    setActiveEffects(prev => {
      const exists = prev.some(effect => effect.type === newEffect.type);
      if (exists) {
        return prev.filter(effect => effect.type !== newEffect.type);
      } else {
        return [...prev, newEffect];
      }
    });
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const addDefaultEffects = useCallback(() => {
    const defaultEffects = [
      stringToCardEffect('holographic'),
      stringToCardEffect('refractor')
    ];
    setActiveEffects(defaultEffects);
  }, []);

  const clearEffects = useCallback(() => {
    setActiveEffects([]);
  }, []);

  return {
    selectedCard,
    activeEffects,
    isFullscreen,
    isPlaying,
    handleCardSelect,
    handleEffectToggle,
    handleFullscreenToggle,
    handlePlayToggle,
    addDefaultEffects,
    clearEffects,
    setSelectedCard,
    setActiveEffects
  };
};
