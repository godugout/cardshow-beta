
import { useState } from 'react';
import { Card } from '@/lib/types/cardTypes';

export function useArCards(initialCards: Card[] = []) {
  const [cards] = useState<Card[]>(initialCards);
  const [currentCard, setCurrentCard] = useState<Card | null>(initialCards[0] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // AR-specific state
  const [isArMode, setIsArMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cameraError, setCameraError] = useState<Error | null>(null);

  const nextCard = () => {
    if (!currentCard) return;
    const currentIndex = cards.findIndex(card => card.id === currentCard.id);
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentCard(cards[nextIndex]);
  };

  const previousCard = () => {
    if (!currentCard) return;
    const currentIndex = cards.findIndex(card => card.id === currentCard.id);
    const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentCard(cards[prevIndex]);
  };

  // AR-specific methods
  const handleLaunchAr = () => setIsArMode(true);
  const handleExitAr = () => setIsArMode(false);
  const handleCameraError = (error: Error) => setCameraError(error);
  const handleTakeSnapshot = () => console.log('Taking snapshot');
  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleZoomIn = () => console.log('Zooming in');
  const handleZoomOut = () => console.log('Zooming out');

  return {
    // Basic card navigation
    cards,
    currentCard: currentCard!,
    loading,
    error: error!,
    nextCard,
    previousCard,
    
    // AR-specific properties
    activeCard: currentCard,
    arCards: cards,
    availableCards: cards,
    isArMode,
    isFlipped,
    cameraError,
    isLoading: loading,
    
    // AR-specific methods
    handleLaunchAr,
    handleExitAr,
    handleCameraError,
    handleTakeSnapshot,
    handleFlip,
    handleZoomIn,
    handleZoomOut,
  };
}
