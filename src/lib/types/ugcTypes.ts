
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

// Add missing exports for moderation
export type UGCModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface UGCReport {
  id: string;
  assetId: string;
  reporterId: string;
  reason: string;
  details: string;
  status: UGCModerationStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface UGCModerationQueue {
  pending: UGCAsset[];
  flagged: UGCAsset[];
  reports: UGCReport[];
}
