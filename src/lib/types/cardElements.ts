
import { JsonValue } from '../types';
import { User } from './user';

export type ElementType = 'sticker' | 'logo' | 'frame' | 'badge' | 'overlay' | 'decoration';
export type ElementCategory = 'sports' | 'holiday' | 'decorative' | 'teams' | 'brands' | 'seasonal' | 'abstract' | 'custom';

export interface CardElement {
  id: string;
  name: string;
  description?: string;
  type: ElementType;
  category: ElementCategory;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isOfficial: boolean;
  creatorId?: string;
  creator?: User;
  isFavorite?: boolean;
  popularity?: number;
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
  category: ElementCategory;
  tags: string[];
  isPublic: boolean;
  fileName: string;
  fileSize: number;
  mimeType: string;
  isAnimated: boolean;
}
