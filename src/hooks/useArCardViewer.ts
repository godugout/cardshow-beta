
import { useState, useCallback } from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

export const useArCardViewer = (id?: string) => {
  const [cards] = useState<Card[]>([
    {
      id: 'ar-sample-1',
      title: 'Sample AR Card 1',
      description: 'A sample card for AR viewing',
      imageUrl: '/placeholder-card.png',
      thumbnailUrl: '/placeholder-card.png',
      tags: ['sample', 'ar'],
      userId: 'system',
      effects: ['holographic'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        ...DEFAULT_DESIGN_METADATA,
        cardStyle: {
          ...DEFAULT_DESIGN_METADATA.cardStyle,
          template: 'classic',
          effect: 'holographic',
          borderRadius: '8px',
          borderColor: '#000000',
          frameColor: '#000000',
          frameWidth: 2,
          shadowColor: 'rgba(0,0,0,0.2)',
        },
        textStyle: {
          ...DEFAULT_DESIGN_METADATA.textStyle,
          titleColor: '#000000',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#333333',
        }
      }
    },
    {
      id: 'ar-sample-2',
      title: 'Sample AR Card 2',
      description: 'Another sample card for AR viewing',
      imageUrl: '/placeholder-card.png',
      thumbnailUrl: '/placeholder-card.png',
      tags: ['sample', 'ar'],
      userId: 'system',
      effects: ['chrome'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      designMetadata: {
        ...DEFAULT_DESIGN_METADATA,
        cardStyle: {
          ...DEFAULT_DESIGN_METADATA.cardStyle,
          template: 'modern',
          effect: 'chrome',
          borderRadius: '10px',
          borderColor: '#000000',
          frameColor: '#000000',
          frameWidth: 2,
          shadowColor: 'rgba(0,0,0,0.2)',
        },
        textStyle: {
          ...DEFAULT_DESIGN_METADATA.textStyle,
          titleColor: '#000000',
          titleAlignment: 'center',
          titleWeight: 'bold',
          descriptionColor: '#333333',
        }
      }
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<Card | null>(cards[0] || null);
  const [arCards, setArCards] = useState<Card[]>([]);
  const [isArMode, setIsArMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const selectCard = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  const handleLaunchAr = useCallback(() => {
    setIsArMode(true);
    if (selectedCard && !arCards.find(c => c.id === selectedCard.id)) {
      setArCards([selectedCard]);
    }
  }, [selectedCard, arCards]);

  const handleExitAr = useCallback(() => {
    setIsArMode(false);
    setArCards([]);
  }, []);

  const handleCameraError = useCallback((errorMessage: string) => {
    setCameraError(errorMessage);
    setError(new Error(errorMessage));
  }, []);

  const handleTakeSnapshot = useCallback(() => {
    // Implement snapshot functionality
    console.log('Taking snapshot');
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleZoomIn = useCallback(() => {
    console.log('Zooming in');
  }, []);

  const handleZoomOut = useCallback(() => {
    console.log('Zooming out');
  }, []);

  const handleRotate = useCallback(() => {
    console.log('Rotating card');
  }, []);

  const handleAddCard = useCallback((cardId: string) => {
    const cardToAdd = cards.find(c => c.id === cardId);
    if (cardToAdd && !arCards.find(c => c.id === cardId)) {
      setArCards(prev => [...prev, cardToAdd]);
    }
  }, [cards, arCards]);

  const handleRemoveCard = useCallback((cardId: string) => {
    setArCards(prev => prev.filter(c => c.id !== cardId));
  }, []);

  const availableCards = cards.filter(c => !arCards.find(ac => ac.id === c.id));
  const activeCard = id ? cards.find(c => c.id === id) || selectedCard : selectedCard;

  return {
    cards,
    selectedCard,
    selectCard,
    activeCard,
    arCards,
    availableCards,
    isArMode,
    isFlipped,
    loading,
    isLoading: loading,
    error,
    cameraError,
    handleLaunchAr,
    handleExitAr,
    handleCameraError,
    handleTakeSnapshot,
    handleFlip,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    handleAddCard,
    handleRemoveCard
  };
};
