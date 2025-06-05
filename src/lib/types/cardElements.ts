
/**
 * Card Elements System Types
 * Defines types for all card elements including stickers, logos, frames, etc.
 */

export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';

export type ElementCategory = 'sports' | 'entertainment' | 'decorative' | 'seasonal';

export interface CardElement {
  id: string;
  type: ElementType;
  category: ElementCategory;
  title: string;
  description?: string;
  thumbnailUrl: string;
  assetUrl: string;
  tags: string[];
  isOfficial: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  downloadCount: number;
  rating: number;
  ratingCount: number;
}

export interface ElementLibraryCollection {
  id: string;
  name: string;
  description?: string;
  category: ElementCategory;
  elements: CardElement[];
  isOfficial: boolean;
  createdAt: string;
}

export interface ElementUploadMetadata {
  title: string;
  description?: string;
  category: ElementCategory;
  tags: string[];
  isPublic: boolean;
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
