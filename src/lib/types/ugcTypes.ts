
import { ElementType, ElementCategory } from './cardElements';

export interface UGCAsset {
  id: string;
  title: string;
  description?: string;
  assetType: ElementType;
  category: ElementCategory;
  thumbnailUrl?: string;
  assetUrl: string;
  tags: string[];
  isOfficial: boolean;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  marketplace?: {
    isForSale: boolean;
    price?: number;
    currency?: string;
    featured: boolean;
  };
}

export interface CreatorProfile {
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  specialties: string[];
  totalAssets: number;
  totalDownloads: number;
  averageRating: number;
  isVerified: boolean;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}
