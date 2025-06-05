
import { useState, useEffect } from 'react';
import { UGCAsset } from '@/lib/types/ugcTypes';
import { ElementType, ElementCategory } from '@/lib/types/cardElements';
import { ModerationStats, ModerationReport } from '@/lib/ugc/ModerationService';

interface UsePublicAssetsOptions {
  assetType?: ElementType;
  category?: ElementCategory;
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'rating';
}

interface ModerationMutation {
  mutateAsync: (params: { assetId: string; status: string; moderatorId: string; reason?: string; notes?: string }) => Promise<void>;
  isPending: boolean;
}

export function useUGCSystem() {
  const usePublicAssets = (options: UsePublicAssetsOptions = {}) => {
    const [data, setData] = useState<UGCAsset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      // Mock data loading
      const mockAssets: UGCAsset[] = [
        {
          id: 'asset-1',
          title: 'Official Sports Badge',
          description: 'Official sports team badge',
          assetType: 'badge' as ElementType,
          category: 'sports' as ElementCategory,
          thumbnailUrl: '/placeholder-badge.png',
          assetUrl: '/placeholder-badge.png',
          tags: ['official', 'sports', 'badge'],
          isOfficial: true,
          creatorId: 'official',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          downloadCount: 150,
          rating: 4.8,
          ratingCount: 25,
          marketplace: {
            isForSale: false,
            featured: true
          }
        }
      ];

      setTimeout(() => {
        setData(mockAssets);
        setIsLoading(false);
      }, 500);
    }, [options]);

    return { data, isLoading, error };
  };

  const useModerationStats = () => {
    const [stats, setStats] = useState<ModerationStats>({
      totalReports: 42,
      pendingReports: 12,
      pendingCount: 12,
      openReports: 15,
      approvedAssets: 1205,
      approvedCount: 1205,
      rejectedAssets: 89,
      rejectedCount: 89,
      flaggedAssets: 15
    });
    const [isLoading, setIsLoading] = useState(false);

    return { data: stats, isLoading };
  };

  const usePendingReports = () => {
    const [reports, setReports] = useState<ModerationReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    return { data: reports, isLoading };
  };

  const moderateAsset: ModerationMutation = {
    mutateAsync: async (params: { assetId: string; status: string; moderatorId: string; reason?: string; notes?: string }) => {
      console.log('Moderating asset:', params);
      return Promise.resolve();
    },
    isPending: false
  };

  return { 
    usePublicAssets, 
    useModerationStats, 
    usePendingReports, 
    moderateAsset 
  };
}
