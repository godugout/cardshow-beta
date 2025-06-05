export interface AssetPerformance {
  views: number;
  downloads: number;
  likes: number;
  shares: number;
  rating: number;
  usageCount: number;
}

export interface AssetDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

export interface UGCAsset {
  id: string;
  title: string;
  description?: string;
  type: 'sticker' | 'logo' | 'frame' | 'background' | 'element';
  category: string;
  tags: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  fileSize: number;
  dimensions: AssetDimensions;
  performance: AssetPerformance;
  userId: string;
  isPublic: boolean;
  isPremium?: boolean;
  price?: number;
  downloads: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  moderationNotes?: string;
}
