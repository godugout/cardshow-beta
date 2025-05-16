
/**
 * Definition for card elements like stickers, logos, etc.
 */
export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';
export type ElementCategoryName = string;

export interface CardElement {
  id: string;
  name: string;
  description?: string;
  type: ElementType;
  category: ElementCategoryName;
  url?: string;  // Make optional if assetUrl is provided
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

// For element-specific types
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

export interface DecorationElement extends CardElement {
  type: 'decoration';
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
  aspectRatio?: number;
  preserveAspectRatio?: boolean;
}

export interface ElementTransform {
  position: ElementPosition;
  size: ElementSize;
}

export interface ElementPlacementOptions {
  snap?: boolean;
  grid?: number;
  constrainToCanvas?: boolean;
  autoScale?: boolean;
}

export interface ElementUploadMetadata {
  name: string;
  description?: string;
  tags: string[];
  category: string;
  isOfficial?: boolean;
  isPremium?: boolean;
}

export interface ElementLibraryCollection {
  id: string;
  name: string;
  elements: CardElement[];
  isOfficial?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Update ElementType to include 'decoration'
export type ElementTypeMap = Record<ElementType, string[]>;

// Create a function to validate if a type is a valid ElementType
export function isValidElementType(type: string): type is ElementType {
  return ['sticker', 'logo', 'frame', 'badge', 'overlay', 'decoration'].includes(type);
}
