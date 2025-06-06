
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
            marketMetadata: {
              isPrintable: false,
              isForSale: false,
              includeInCatalog: false
            }
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
            marketMetadata: {
              isPrintable: false,
              isForSale: false,
              includeInCatalog: false
            }
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
      
      toast.error('Failed to load card data');
    }
  }, []);
  
  const selectCard = useCallback((cardId: string | null) => {
    setState(prev => {
      if (!cardId) {
        return { ...prev, selectedCardId: null, selectedCard: null };
      }
      
      const selectedCard = prev.cards.find(card => card.id === cardId) || null;
      
      if (!selectedCard) {
        toast.error('The selected card could not be found');
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
        toast.error('Please select a card to view in AR');
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
            toast.error('Please allow camera access to use AR features');
            setState(prev => ({ ...prev, showCamera: false }));
          });
      }
      
      return { ...prev, showCamera: newShowCamera };
    });
  }, []);
  
  const toggleInfoPanel = useCallback(() => {
    setState(prev => ({ ...prev, showInfo: !prev.showInfo }));
    toast.success(state.showInfo ? 'Info panel hidden' : 'Info panel shown');
  }, [state.showInfo]);
  
  const toggleControlsPanel = useCallback(() => {
    setState(prev => ({ ...prev, showControls: !prev.showControls }));
    toast.success(state.showControls ? 'Controls hidden' : 'Controls shown');
  }, [state.showControls]);
  
  const toggleHighlights = useCallback(() => {
    setState(prev => ({ ...prev, showHighlights: !prev.showHighlights }));
    toast.success(state.showHighlights ? 'Highlights hidden' : 'Highlights shown');
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
