
/**
 * Card Elements System Types
 * Defines types for all card elements including stickers, logos, frames, etc.
 */

export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';

export type ElementCategory = 'sports' | 'entertainment' | 'decorative' | 'seasonal' | 'teams';

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

export interface ElementStyle {
  opacity?: number;
  blendMode?: string;
  filter?: string;
}

export interface CardElement {
  id: string;
  type: ElementType;
  category: ElementCategory;
  title: string;
  name: string; // Added for backward compatibility
  description?: string;
  thumbnailUrl: string;
  assetUrl: string;
  url?: string; // Added for backward compatibility
  tags: string[];
  isOfficial: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  
  // Layout properties
  position: ElementPosition;
  size: ElementSize;
  style?: ElementStyle;
  metadata?: Record<string, any>;
}

// Specialized element types
export interface StickerElement extends CardElement {
  type: 'sticker';
  isAnimated?: boolean;
  animationDuration?: number;
}

export interface LogoElement extends CardElement {
  type: 'logo';
  isVector?: boolean;
  brandName?: string;
}

export interface FrameElement extends CardElement {
  type: 'frame';
  frameType?: 'full' | 'corner' | 'edge';
  thickness?: number;
  isResizable?: boolean;
}

export interface BadgeElement extends CardElement {
  type: 'badge';
  badgeType?: 'achievement' | 'rank' | 'custom';
  level?: number;
}

export interface OverlayElement extends CardElement {
  type: 'overlay';
  overlayType?: 'texture' | 'pattern' | 'filter';
  blendMode?: string;
  intensity?: number;
}

export interface ElementLibraryCollection {
  id: string;
  name: string;
  description?: string;
  category: ElementCategory;
  elements: CardElement[];
  elementIds: string[]; // Added for backward compatibility
  isOfficial: boolean;
  createdAt: string;
  updatedAt?: string; // Made optional to fix errors
}

export interface ElementUploadMetadata {
  title: string;
  description?: string;
  category: ElementCategory;
  tags: string[];
  isPublic: boolean;
  fileSize?: number; // Added for backward compatibility
}

export interface ElementTransform {
  position: { x: number; y: number };
  size: { width: number; height: number };
  translateX: number;
  translateY: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
}

export interface ElementPlacementOptions {
  position?: Partial<ElementPosition>;
  size?: Partial<ElementSize>;
  style?: Partial<ElementStyle>;
  snapToGrid?: boolean;
}
