
import { ElementType, ElementCategory } from '@/lib/types/cardElements';

export interface CreatorProfile {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UGCAsset {
  id: string;
  title: string;
  description?: string;
  assetUrl: string;
  thumbnailUrl: string;
  creatorId: string;
  tags: string[];
  category: string;
  assetType: ElementType;
  isOfficial: boolean;
  isPublic: boolean;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  marketplace?: {
    isForSale: boolean;
    price?: number;
    currency?: string;
    featured: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export class UGCManager {
  private static assets: UGCAsset[] = [];
  private static profiles: Map<string, CreatorProfile> = new Map();

  static async getPublicAssets(): Promise<UGCAsset[]> {
    return this.assets.filter(asset => asset.isPublic);
  }

  static async uploadAsset(
    file: File,
    metadata: {
      title: string;
      description?: string;
      tags: string[];
      category: string;
      assetType: ElementType;
      isPublic: boolean;
    },
    creatorId: string
  ): Promise<UGCAsset> {
    // Mock upload - in real implementation would handle file upload
    const asset: UGCAsset = {
      id: `asset-${Date.now()}`,
      title: metadata.title,
      description: metadata.description,
      assetUrl: URL.createObjectURL(file),
      thumbnailUrl: URL.createObjectURL(file),
      creatorId,
      tags: metadata.tags,
      category: metadata.category,
      assetType: metadata.assetType,
      isOfficial: false,
      isPublic: metadata.isPublic,
      downloadCount: 0,
      rating: 0,
      ratingCount: 0,
      marketplace: {
        isForSale: false,
        featured: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.assets.push(asset);
    return asset;
  }

  static async getCreatorProfile(creatorId: string): Promise<CreatorProfile | null> {
    return this.profiles.get(creatorId) || null;
  }

  static async updateCreatorProfile(
    creatorId: string, 
    updates: Partial<CreatorProfile>
  ): Promise<CreatorProfile> {
    const existing = this.profiles.get(creatorId);
    const profile: CreatorProfile = {
      id: creatorId,
      name: 'Creator',
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...existing,
      ...updates
    };

    this.profiles.set(creatorId, profile);
    return profile;
  }
}
