
import { useState, useCallback } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

export const useArCardViewer = (cardId?: string) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeEffects, setActiveEffects] = useState<CardEffect[]>([
    stringToCardEffect('holographic')
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isArMode, setIsArMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for AR cards and available cards
  const [arCards, setArCards] = useState<Card[]>([]);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);

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

  const handleLaunchAr = useCallback(() => {
    setIsArMode(true);
  }, []);

  const handleExitAr = useCallback(() => {
    setIsArMode(false);
  }, []);

  const handleCameraError = useCallback((error: string) => {
    setCameraError(error);
  }, []);

  const handleTakeSnapshot = useCallback(() => {
    // Mock implementation
    console.log('Taking snapshot');
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleZoomIn = useCallback(() => {
    // Mock implementation
    console.log('Zooming in');
  }, []);

  const handleZoomOut = useCallback(() => {
    // Mock implementation
    console.log('Zooming out');
  }, []);

  const handleRotate = useCallback(() => {
    // Mock implementation
    console.log('Rotating');
  }, []);

  const handleAddCard = useCallback((cardId: string) => {
    // Mock implementation
    console.log('Adding card:', cardId);
  }, []);

  const handleRemoveCard = useCallback((cardId: string) => {
    // Mock implementation
    console.log('Removing card:', cardId);
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
    isArMode,
    isFlipped,
    cameraError,
    isLoading,
    arCards,
    availableCards,
    activeCard: selectedCard, // Alias for backward compatibility
    handleCardSelect,
    handleEffectToggle,
    handleFullscreenToggle,
    handlePlayToggle,
    handleLaunchAr,
    handleExitAr,
    handleCameraError,
    handleTakeSnapshot,
    handleFlip,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    handleAddCard,
    handleRemoveCard,
    addDefaultEffects,
    clearEffects,
    setSelectedCard,
    setActiveEffects
  };
};
