
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Card } from '@/lib/types/cardTypes';
import { useQueryClient } from '@tanstack/react-query';

export enum ArViewMode {
  DEFAULT = 'default',
  AR = 'ar',
  PHOTO = 'photo',
  COLLECTION = 'collection'
}

export interface ArCardViewerState {
  viewMode: ArViewMode;
  selectedCardId: string | null;
  isLoading: boolean;
  showInfo: boolean;
  showControls: boolean;
  showHighlights: boolean;
  error: Error | null;
  cards: Card[];
  selectedCard: Card | null;
  showCamera: boolean;
  cardPosition: { x: number; y: number; z: number };
  cardRotation: { x: number; y: number; z: number };
  cardScale: number;
  backgroundColor: string;
  environmentMap: string;
  effectIntensity: number;
}

const initialState: ArCardViewerState = {
  viewMode: ArViewMode.DEFAULT,
  selectedCardId: null,
  isLoading: false,
  showInfo: true,
  showControls: true,
  showHighlights: true,
  error: null,
  cards: [],
  selectedCard: null,
  showCamera: false,
  cardPosition: { x: 0, y: 0, z: 0 },
  cardRotation: { x: 0, y: 0, z: 0 },
  cardScale: 1,
  backgroundColor: '#000000',
  environmentMap: 'studio',
  effectIntensity: 1
};

export const useArCardViewer = () => {
  const [state, setState] = useState<ArCardViewerState>(initialState);
  const queryClient = useQueryClient();
  
  const fetchCards = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Mocked data for development
      const cards: Card[] = [
        {
          id: '1',
          title: 'First Card',
          description: 'Card description text',
          imageUrl: '/images/card-placeholder.png',
          thumbnailUrl: '/images/card-placeholder.png',
          tags: ['tag1', 'tag2'],
          userId: 'user1',
          effects: [],
          designMetadata: {
            cardStyle: {
              template: 'standard',
              effect: 'none',
              borderRadius: '10px',
              borderColor: '#000',
              shadowColor: 'rgba(0,0,0,0.2)',
              frameWidth: 0,
              frameColor: '#000'
            },
            textStyle: {
              titleColor: '#000',
              titleAlignment: 'center',
              titleWeight: 'bold',
              descriptionColor: '#333'
            },
            cardMetadata: {},
            marketMetadata: {}
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Second Card',
          description: 'Another card description',
          imageUrl: '/images/card-placeholder.png',
          thumbnailUrl: '/images/card-placeholder.png',
          tags: ['tag3', 'tag4'],
          userId: 'user1',
          effects: [],
          designMetadata: {
            cardStyle: {
              template: 'standard',
              effect: 'none',
              borderRadius: '10px',
              borderColor: '#000',
              shadowColor: 'rgba(0,0,0,0.2)',
              frameWidth: 0,
              frameColor: '#000'
            },
            textStyle: {
              titleColor: '#000',
              titleAlignment: 'center',
              titleWeight: 'bold',
              descriptionColor: '#333'
            },
            cardMetadata: {},
            marketMetadata: {}
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      setState(prev => ({
        ...prev,
        cards,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch cards')
      }));
      
      toast('Error loading cards', {
        description: 'Failed to load card data',
        id: 'error-loading-cards',
        variant: 'destructive'
      });
    }
  }, []);
  
  const selectCard = useCallback((cardId: string | null) => {
    setState(prev => {
      if (!cardId) {
        return { ...prev, selectedCardId: null, selectedCard: null };
      }
      
      const selectedCard = prev.cards.find(card => card.id === cardId) || null;
      
      if (!selectedCard) {
        toast('Card not found', {
          description: 'The selected card could not be found',
          id: 'card-not-found',
          variant: 'destructive'
        });
        return prev;
      }
      
      return {
        ...prev,
        selectedCardId: cardId,
        selectedCard,
        showInfo: true
      };
    });
  }, []);
  
  const changeViewMode = useCallback((mode: ArViewMode) => {
    setState(prev => {
      if (mode === ArViewMode.AR && !prev.selectedCardId) {
        toast('No card selected', {
          description: 'Please select a card to view in AR',
          id: 'no-card-selected',
          variant: 'destructive'
        });
        return prev;
      }
      
      return { ...prev, viewMode: mode };
    });
  }, []);
  
  const toggleCameraView = useCallback(() => {
    setState(prev => {
      const newShowCamera = !prev.showCamera;
      
      if (newShowCamera) {
        // Request camera permissions
        navigator.mediaDevices?.getUserMedia({ video: true })
          .catch(error => {
            toast('Camera access denied', {
              description: 'Please allow camera access to use AR features',
              id: 'camera-access-denied'
            });
            setState(prev => ({ ...prev, showCamera: false }));
          });
      }
      
      return { ...prev, showCamera: newShowCamera };
    });
  }, []);
  
  const toggleInfoPanel = useCallback(() => {
    setState(prev => ({ ...prev, showInfo: !prev.showInfo }));
    toast('Info panel toggled', {
      description: state.showInfo ? 'Info panel hidden' : 'Info panel shown',
      id: 'info-panel-toggled'
    });
  }, [state.showInfo]);
  
  const toggleControlsPanel = useCallback(() => {
    setState(prev => ({ ...prev, showControls: !prev.showControls }));
    toast('Controls panel toggled', {
      description: state.showControls ? 'Controls hidden' : 'Controls shown',
      id: 'controls-panel-toggled'
    });
  }, [state.showControls]);
  
  const toggleHighlights = useCallback(() => {
    setState(prev => ({ ...prev, showHighlights: !prev.showHighlights }));
    toast('Highlights toggled', {
      description: state.showHighlights ? 'Highlights hidden' : 'Highlights shown',
      id: 'highlights-toggled'
    });
  }, [state.showHighlights]);
  
  const resetCard = useCallback(() => {
    setState(prev => ({
      ...prev,
      cardPosition: { x: 0, y: 0, z: 0 },
      cardRotation: { x: 0, y: 0, z: 0 },
      cardScale: 1
    }));
  }, []);
  
  useEffect(() => {
    fetchCards();
    
    // Setup event listeners and clean up
    return () => {
      // Clean up code here
    };
  }, [fetchCards]);
  
  return {
    ...state,
    selectCard,
    changeViewMode,
    toggleCameraView,
    toggleInfoPanel,
    toggleControlsPanel,
    toggleHighlights,
    resetCard,
    setState,
    fetchCards
  };
};

export default useArCardViewer;
