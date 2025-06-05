
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
  version?: string; // Added version property
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
    website?: string; // Added website property
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

// Add missing metadata interfaces
export interface ModerationMetadata {
  status: UGCModerationStatus;
  moderatedBy?: string;
  moderatedAt?: string;
  moderationNotes?: string;
  violationReason?: string;
  aiConfidenceScore?: number; // Added aiConfidenceScore property
}

export interface MarketplaceMetadata {
  isForSale: boolean;
  price?: number;
  currency?: string;
  featured?: boolean;
  salesCount?: number;
  revenue?: number;
  pricingModel?: string; // Added pricingModel property
}

// Add performance metrics interface
export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  downloadSpeed: number;
  qualityScore: number;
}

// Add CreationHistoryItem interface
export interface CreationHistoryItem {
  id: string;
  cardId: string;
  effectsUsed: string[];
  elementsUsed: string[];
  timeSpent: number;
  createdAt: string;
}

// Add UserStyleProfile interface with favoriteTemplates
export interface UserStyleProfile {
  userId: string;
  preferredColors: string[];
  preferredEffects: string[];
  favoriteTemplates: string[]; // Added favoriteTemplates property
  styleCategories: string[];
  createdAt: string;
  updatedAt: string;
}
