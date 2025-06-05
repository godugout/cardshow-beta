
import { UGCAsset, CreatorProfile, UGCModerationStatus } from '../types/ugcTypes';
import { ModerationMetadata, MarketplaceMetadata, PerformanceMetrics } from '../types/ugcTypes';
import { ElementType, ElementCategory } from '../types/cardElements';

export class UGCManager {
  private assets: Map<string, UGCAsset> = new Map();
  private creators: Map<string, CreatorProfile> = new Map();
  private moderationQueue: UGCAsset[] = [];

  constructor() {
    // Mock data for demonstration
    this.createMockAssets();
    this.createMockCreators();
  }

  private createMockAssets(): void {
    const now = new Date().toISOString();

    const asset1: UGCAsset = {
      id: 'asset-1',
      title: 'Cool Sticker',
      description: 'A shiny sticker',
      assetType: 'sticker',
      category: 'decorative',
      thumbnailUrl: '/path/to/thumbnail1.jpg',
      assetUrl: '/path/to/asset1.png',
      tags: ['sticker', 'shiny', 'cool'],
      isOfficial: false,
      creatorId: 'creator-1',
      createdAt: now,
      updatedAt: now,
      downloadCount: 150,
      rating: 4.5,
      ratingCount: 30,
      version: '1.0'
    };

    const asset2: UGCAsset = {
      id: 'asset-2',
      title: 'Awesome Logo',
      description: 'A professional logo',
      assetType: 'logo',
      category: 'sports',
      thumbnailUrl: '/path/to/thumbnail2.jpg',
      assetUrl: '/path/to/asset2.svg',
      tags: ['logo', 'sports', 'professional'],
      isOfficial: true,
      creatorId: 'creator-2',
      createdAt: now,
      updatedAt: now,
      downloadCount: 200,
      rating: 4.8,
      ratingCount: 40,
      version: '1.2'
    };

    this.assets.set(asset1.id, asset1);
    this.assets.set(asset2.id, asset2);
  }

  private createMockCreators(): void {
    const now = new Date().toISOString();

    const creator1: CreatorProfile = {
      userId: 'creator-1',
      displayName: 'John Doe',
      bio: 'Digital artist',
      avatarUrl: '/path/to/avatar1.jpg',
      specialties: ['stickers', 'emojis'],
      totalAssets: 10,
      totalDownloads: 1000,
      averageRating: 4.7,
      isVerified: true,
      socialLinks: {
        twitter: '@johndoe',
        instagram: '@johndoeart',
        website: 'https://johndoe.art'
      },
      createdAt: now,
      updatedAt: now
    };

    const creator2: CreatorProfile = {
      userId: 'creator-2',
      displayName: 'Jane Smith',
      bio: 'Logo designer',
      avatarUrl: '/path/to/avatar2.jpg',
      specialties: ['logos', 'branding'],
      totalAssets: 5,
      totalDownloads: 500,
      averageRating: 4.9,
      isVerified: false,
      socialLinks: {
        twitter: '@janesmithdesign',
        instagram: '@janesmithdesign',
        website: 'https://janesmith.design'
      },
      createdAt: now,
      updatedAt: now
    };

    this.creators.set(creator1.userId, creator1);
    this.creators.set(creator2.userId, creator2);
  }

  async submitAssetForReview(
    title: string,
    description: string,
    assetType: ElementType,
    category: ElementCategory,
    assetUrl: string,
    thumbnailUrl: string,
    tags: string[],
    creatorId: string
  ): Promise<UGCAsset> {
    const now = new Date().toISOString();
    const assetId = `asset-${Date.now()}`;

    const newAsset: UGCAsset = {
      id: assetId,
      title,
      description,
      assetType,
      category,
      thumbnailUrl,
      assetUrl,
      tags,
      isOfficial: false,
      creatorId,
      createdAt: now,
      updatedAt: now,
      downloadCount: 0,
      rating: 0,
      ratingCount: 0,
      version: '1.0'
    };

    this.assets.set(assetId, newAsset);
    this.moderationQueue.push(newAsset);

    return newAsset;
  }

  async uploadAsset(
    title: string,
    description: string,
    assetType: ElementType,
    category: ElementCategory,
    file: File,
    creatorId: string
  ): Promise<UGCAsset> {
    // Mock file upload
    const assetUrl = URL.createObjectURL(file);
    const thumbnailUrl = assetUrl; // In real implementation, would generate thumbnail
    
    return this.submitAssetForReview(
      title,
      description,
      assetType,
      category,
      assetUrl,
      thumbnailUrl,
      [],
      creatorId
    );
  }

  async getPublicAssets(category?: ElementCategory): Promise<UGCAsset[]> {
    const assets = Array.from(this.assets.values());
    if (category) {
      return assets.filter(asset => asset.category === category && asset.isOfficial);
    }
    return assets.filter(asset => asset.isOfficial);
  }

  private async moderateAsset(assetId: string): Promise<void> {
    const asset = this.assets.get(assetId);
    if (!asset) return;

    // Mock moderation metadata
    const moderationData: ModerationMetadata = {
      status: 'approved' as UGCModerationStatus,
      moderatedBy: 'ai-moderator',
      moderatedAt: new Date().toISOString(),
      moderationNotes: 'Asset passed automated moderation checks',
      aiConfidenceScore: 0.95
    };

    const marketplaceData: MarketplaceMetadata = {
      isForSale: false,
      featured: false,
      pricingModel: 'free'
    };

    // Update asset with moderation results
    const moderatedAsset: UGCAsset = {
      ...asset,
      downloadCount: 0,
      rating: 0,
      ratingCount: 0
    };

    this.assets.set(assetId, moderatedAsset);
  }

  async getAssetById(assetId: string): Promise<UGCAsset | undefined> {
    return this.assets.get(assetId);
  }

  async getCreatorProfile(creatorId: string): Promise<CreatorProfile | undefined> {
    return this.creators.get(creatorId);
  }

  async listAssetsInModerationQueue(): Promise<UGCAsset[]> {
    return [...this.moderationQueue];
  }

  async approveAsset(assetId: string): Promise<void> {
    const asset = this.assets.get(assetId);
    if (!asset) return;

    asset.isOfficial = true;
    this.assets.set(assetId, asset);

    // Remove from moderation queue
    this.moderationQueue = this.moderationQueue.filter(a => a.id !== assetId);
  }

  async rejectAsset(assetId: string): Promise<void> {
    this.assets.delete(assetId);
    this.moderationQueue = this.moderationQueue.filter(a => a.id !== assetId);
  }

  async searchAssets(query: string, filters: {
    category?: ElementCategory;
    type?: ElementType;
    tags?: string[];
  } = {}): Promise<UGCAsset[]> {
    const allAssets = Array.from(this.assets.values());
    
    return allAssets.filter(asset => {
      if (query && !asset.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (filters.category && asset.category !== filters.category) {
        return false;
      }

      if (filters.type && asset.assetType !== filters.type) {
        return false;
      }

      if (filters.tags && !filters.tags.every(tag => asset.tags.includes(tag))) {
        return false;
      }
      return true;
    });
  }

  async generateCategoryStats(): Promise<Record<ElementType, string[]>> {
    return {
      sticker: ['emoji', 'characters', 'objects'],
      logo: ['sports', 'brands', 'symbols'],
      frame: ['decorative', 'geometric', 'artistic'],
      badge: ['achievements', 'ranks', 'awards'],
      overlay: ['textures', 'patterns', 'effects'],
      decoration: ['borders', 'corners', 'accents']
    };
  }

  async getTrendingAssets(limit: number = 10): Promise<UGCAsset[]> {
    // Mock trending assets based on download count
    const assets = Array.from(this.assets.values());
    return assets.sort((a, b) => b.downloadCount - a.downloadCount).slice(0, limit);
  }

  async getNewestAssets(limit: number = 10): Promise<UGCAsset[]> {
    // Mock newest assets based on creation date
    const assets = Array.from(this.assets.values());
    return assets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
  }

  async analyzePerformance(assetId: string): Promise<PerformanceMetrics> {
    // Mock performance analysis
    return {
      renderTime: Math.random() * 100,
      memoryUsage: Math.random() * 1024,
      downloadSpeed: Math.random() * 10,
      qualityScore: Math.random() * 100
    };
  }

  async recordDownload(assetId: string): Promise<void> {
    const asset = this.assets.get(assetId);
    if (asset) {
      asset.downloadCount = (asset.downloadCount || 0) + 1;
      this.assets.set(assetId, asset);
    }
  }

  async recordRating(assetId: string, rating: number): Promise<void> {
    const asset = this.assets.get(assetId);
    if (asset) {
      asset.ratingCount = (asset.ratingCount || 0) + 1;
      asset.rating = ((asset.rating || 0) * (asset.ratingCount - 1) + rating) / asset.ratingCount;
      this.assets.set(assetId, asset);
    }
  }

  async getUserAssets(userId: string, includePrivate = false): Promise<UGCAsset[]> {
    const userAssets = Array.from(this.assets.values())
      .filter(asset => asset.creatorId === userId);
    
    // Add missing properties to ensure type compatibility
    return userAssets.map(asset => ({
      ...asset,
      downloadCount: asset.downloadCount || 0,
      rating: asset.rating || 0,
      ratingCount: asset.ratingCount || 0
    }));
  }

  async createCreatorProfile(data: Partial<CreatorProfile> & { userId: string }): Promise<CreatorProfile> {
    const profile: CreatorProfile = {
      userId: data.userId,
      displayName: data.displayName || 'Unknown Creator',
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      specialties: data.specialties || [],
      totalAssets: 0,
      totalDownloads: 0,
      averageRating: 0,
      isVerified: false,
      socialLinks: {
        twitter: data.socialLinks?.twitter,
        instagram: data.socialLinks?.instagram,
        website: data.socialLinks?.website
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.creators.set(data.userId, profile);
    return profile;
  }

  async updateCreatorProfile(userId: string, updates: Partial<CreatorProfile>): Promise<CreatorProfile | null> {
    const profile = this.creators.get(userId);
    if (!profile) return null;

    const updatedProfile: CreatorProfile = {
      ...profile,
      ...updates,
      socialLinks: {
        ...profile.socialLinks,
        ...updates.socialLinks,
        website: updates.socialLinks?.website || profile.socialLinks?.website
      },
      updatedAt: new Date().toISOString()
    };

    this.creators.set(userId, updatedProfile);
    return updatedProfile;
  }
}

export const ugcManager = new UGCManager();
