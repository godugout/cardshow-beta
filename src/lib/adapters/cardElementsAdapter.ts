
import { CardLayer } from '@/lib/types/cardTypes';
import { CardElement } from '@/lib/types/cardElements';

export function adaptElementToLayer(element: CardElement): CardLayer {
  return {
    id: element.id,
    name: element.title || element.name,
    type: element.type as 'image' | 'text' | 'shape' | 'effect' | 'sticker',
    content: element.assetUrl || '',
    position: {
      x: element.position.x,
      y: element.position.y,
      z: element.position.z
    },
    size: {
      width: element.size.width,
      height: element.size.height
    },
    rotation: element.position.rotation || 0,
    opacity: element.style.opacity,
    zIndex: element.position.z,
    visible: true,
    locked: false,
    effectIds: []
  };
}

export function adaptLayerToElement(layer: CardLayer): Partial<CardElement> {
  return {
    id: layer.id,
    name: layer.name,
    title: layer.name,
    type: layer.type as any,
    assetUrl: typeof layer.content === 'string' ? layer.content : '',
    position: {
      x: layer.position.x,
      y: layer.position.y,
      z: layer.position.z,
      rotation: layer.rotation
    },
    size: {
      width: typeof layer.size.width === 'number' ? layer.size.width : 100,
      height: typeof layer.size.height === 'number' ? layer.size.height : 100,
      scale: 1,
      aspectRatio: 1,
      preserveAspectRatio: true
    },
    style: {
      opacity: layer.opacity
    }
  };
}
