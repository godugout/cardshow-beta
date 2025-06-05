
/**
 * Definition for card elements like stickers, logos, etc.
 */
export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';
export type ElementCategoryType = string;

export interface CardElement {
  id: string;
  name: string;
  description?: string;
  type: ElementType;
  category: ElementCategoryType;
  url: string;
  thumbnailUrl?: string;
  assetUrl?: string;
  tags: string[];
  isOfficial?: boolean;
  isPremium?: boolean;
  price?: number;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  width?: number;
  height?: number;
  scale?: number;
  position: { 
    x: number; 
    y: number;
    z?: number; 
    rotation?: number;
  };
  size: {
    width: number;
    height: number;
    scale?: number;
    aspectRatio?: number;
    preserveAspectRatio?: boolean;
  };
  style?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface ElementCategory {
  id: string;
  name: string;
  description?: string;
  count?: number;
  tags?: string[];
  thumbnailUrl?: string;
}

export interface ElementLibrary {
  categories: ElementCategory[];
  elements: Record<string, CardElement[]>;
  featured: string[];
  recentlyUsed: string[];
}

// Additional types for element system
export interface StickerElement extends CardElement {
  type: 'sticker';
}

export interface LogoElement extends CardElement {
  type: 'logo';
}

export interface FrameElement extends CardElement {
  type: 'frame';
}

export interface BadgeElement extends CardElement {
  type: 'badge';
}

export interface OverlayElement extends CardElement {
  type: 'overlay';
}

export interface ElementLibraryCollection {
  id: string;
  name: string;
  elements: CardElement[];
}

export interface ElementUploadMetadata {
  originalName: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  fileName?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  hasTransparency?: boolean;
  isAnimated?: boolean;
}

export interface ElementPosition {
  x: number;
  y: number;
  z?: number;
  rotation?: number;
}

export interface ElementSize {
  width: number;
  height: number;
  scale?: number;
}

export interface ElementTransform {
  position: ElementPosition;
  size: ElementSize;
  rotation?: number;
  opacity?: number;
  translateX?: number;
  translateY?: number;
  rotate?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface ElementPlacementOptions {
  snapToGrid?: boolean;
  gridSize?: number;
  constrainToBounds?: boolean;
  allowOverlap?: boolean;
  position?: ElementPosition;
  size?: ElementSize;
  style?: Record<string, any>;
}
