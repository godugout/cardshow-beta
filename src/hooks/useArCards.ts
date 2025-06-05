
import { useState } from 'react';
import { Card } from '@/lib/types/cardTypes';
import { sampleCards } from '@/lib/sampleCards';

export function useArCards(initialCards: Card[] = sampleCards) {
  const [cards] = useState<Card[]>(initialCards);
  const [currentCard, setCurrentCard] = useState<Card | null>(initialCards[0] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // AR-specific state
  const [isArMode, setIsArMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [arCards, setArCards] = useState<Card[]>([]);
  const [availableCards, setAvailableCards] = useState<Card[]>(initialCards);

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
  const handleCameraError = (errorMsg: string) => setCameraError(errorMsg);
  const handleTakeSnapshot = () => console.log('Taking snapshot');
  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleZoomIn = () => console.log('Zooming in');
  const handleZoomOut = () => console.log('Zooming out');
  const handleRotate = () => console.log('Rotating');
  const handleAddCard = (cardId: string) => {
    const card = availableCards.find(c => c.id === cardId);
    if (card) {
      setArCards(prev => [...prev, card]);
      setAvailableCards(prev => prev.filter(c => c.id !== cardId));
    }
  };
  const handleRemoveCard = (cardId: string) => {
    const card = arCards.find(c => c.id === cardId);
    if (card) {
      setArCards(prev => prev.filter(c => c.id !== cardId));
      setAvailableCards(prev => [...prev, card]);
    }
  };

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
    arCards,
    availableCards,
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
    handleRotate,
    handleAddCard,
    handleRemoveCard,
  };
}
