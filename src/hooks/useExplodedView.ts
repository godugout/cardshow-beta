
import { useState, useRef, useCallback } from 'react';
import { Card, CardEffect } from '@/lib/types';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

export interface LayerData {
  id: string;
  name: string;
  type: 'base' | 'text' | 'effect' | 'overlay';
  visible: boolean;
  opacity: number;
  zIndex: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  content?: any;
  effectSettings?: Record<string, any>;
}

export const useExplodedView = (card?: Card) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Initialize layers based on card data
  const [layers, setLayers] = useState<LayerData[]>(() => {
    if (!card) return [];
    
    const baseLayers: LayerData[] = [
      {
        id: 'base',
        name: 'Card Base',
        type: 'base',
        visible: true,
        opacity: 1,
        zIndex: 0,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        content: { imageUrl: card.imageUrl }
      },
      {
        id: 'text',
        name: 'Text Layer',
        type: 'text',
        visible: true,
        opacity: 1,
        zIndex: 1,
        position: { x: 0, y: 0, z: 0.1 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
        content: { title: card.title, description: card.description }
      }
    ];

    // Add effect layers for each card effect
    if (card.effects && Array.isArray(card.effects)) {
      card.effects.forEach((effect, index) => {
        const cardEffect = typeof effect === 'string' ? stringToCardEffect(effect) : effect;
        baseLayers.push({
          id: `effect-${index}`,
          name: `Effect: ${cardEffect.name || cardEffect.type}`,
          type: 'effect',
          visible: true,
          opacity: cardEffect.intensity || 0.7,
          zIndex: 2 + index,
          position: { x: 0, y: 0, z: 0.2 + (index * 0.1) },
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1,
          content: cardEffect,
          effectSettings: cardEffect.settings || {}
        });
      });
    }

    return baseLayers;
  });

  const toggleExplodedView = useCallback(() => {
    setIsExploded(prev => !prev);
  }, []);

  const selectLayer = useCallback((layerId: string) => {
    setSelectedLayer(layerId);
  }, []);

  const updateLayerProperty = useCallback((layerId: string, property: string, value: any) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, [property]: value }
        : layer
    ));
  }, []);

  const toggleLayerVisibility = useCallback((layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  }, []);

  const addEffectLayer = useCallback((effectType: string) => {
    const newEffect = stringToCardEffect(effectType);
    const newLayer: LayerData = {
      id: `effect-${Date.now()}`,
      name: `Effect: ${newEffect.name || newEffect.type}`,
      type: 'effect',
      visible: true,
      opacity: newEffect.intensity || 0.7,
      zIndex: layers.length,
      position: { x: 0, y: 0, z: 0.2 + (layers.length * 0.1) },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      content: newEffect,
      effectSettings: newEffect.settings || {}
    };
    
    setLayers(prev => [...prev, newLayer]);
  }, [layers.length]);

  const removeLayer = useCallback((layerId: string) => {
    setLayers(prev => prev.filter(layer => layer.id !== layerId));
    if (selectedLayer === layerId) {
      setSelectedLayer(null);
    }
  }, [selectedLayer]);

  const resetLayers = useCallback(() => {
    setLayers(prev => prev.map(layer => ({
      ...layer,
      position: { x: 0, y: 0, z: layer.zIndex * 0.1 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      opacity: layer.type === 'effect' ? 0.7 : 1
    })));
  }, []);

  const getExplodedPosition = useCallback((layer: LayerData) => {
    if (!isExploded) return layer.position;
    
    const explodeDistance = 50;
    return {
      x: layer.position.x + (layer.zIndex * explodeDistance),
      y: layer.position.y + (layer.zIndex * explodeDistance),
      z: layer.position.z + (layer.zIndex * 20)
    };
  }, [isExploded]);

  return {
    containerRef,
    isExploded,
    selectedLayer,
    animationSpeed,
    layers,
    toggleExplodedView,
    selectLayer,
    updateLayerProperty,
    toggleLayerVisibility,
    addEffectLayer,
    removeLayer,
    resetLayers,
    getExplodedPosition,
    setAnimationSpeed,
    setLayers
  };
};
