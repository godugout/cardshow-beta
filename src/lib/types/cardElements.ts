
import { JsonValue } from '../types';
import { User } from './user';

export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';
export type ElementCategory = 'sports' | 'holiday' | 'decorative' | 'teams' | 'brands' | 'seasonal' | 'abstract' | 'custom';

// Position interface for element placement
export interface ElementPosition {
  x: number;
  y: number;
  z: number;
  rotation?: number;
}

// Size interface for element dimensions
export interface ElementSize {
  width: number;
  height: number;
  scale: number;
  aspectRatio: number;
  preserveAspectRatio: boolean;
}

// Style interface for element styling
export interface ElementStyle {
  opacity: number;
  blendMode?: string;
  filter?: string;
  [key: string]: any;
}

export interface CardElement {
  id: string;
  name: string;
  title: string; // Add title as primary display name
  description?: string;
  type: ElementType;
  category: ElementCategory;
  imageUrl: string; // Required property
  thumbnailUrl: string;
  assetUrl: string; // Add primary asset URL
  url?: string; // Keep as fallback
  tags: string[];
  isOfficial: boolean;
  isPremium: boolean;
  creatorId?: string;
  creator?: User;
  isFavorite?: boolean;
  popularity?: number;
  
  // Placement and styling properties
  position: ElementPosition;
  size: ElementSize;
  style: ElementStyle;
  
  // Usage statistics
  downloadCount: number;
  rating: number;
  ratingCount: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface ElementCollection {
  id: string;
  name: string;
  description?: string;
  elements: CardElement[];
  isOfficial: boolean;
  creatorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ElementUploadMetadata {
  title: string;
  description?: string; // Add description property
  category: ElementCategory;
  tags: string[];
  isPublic: boolean;
  fileName: string;
  fileSize: number;
  mimeType: string;
  isAnimated: boolean;
}
