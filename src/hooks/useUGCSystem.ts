
import { useState, useEffect } from 'react';
import { UGCAsset } from '@/lib/types/ugcTypes';
import { ElementType, ElementCategory } from '@/lib/types/cardElements';

interface UsePublicAssetsOptions {
  assetType?: ElementType;
  category?: ElementCategory;
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'rating';
}

interface ModerationStats {
  pending: number;
  approved: number;
  rejected: number;
  flagged: number;
}

interface PendingReport {
  id: string;
  assetId: string;
  reporterId: string;
  reason: string;
  createdAt: string;
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
      pending: 5,
      approved: 150,
      rejected: 10,
      flagged: 2
    });
    const [isLoading, setIsLoading] = useState(false);

    return { data: stats, isLoading };
  };

  const usePendingReports = () => {
    const [reports, setReports] = useState<PendingReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    return { data: reports, isLoading };
  };

  const moderateAsset = async (assetId: string, action: 'approve' | 'reject', reason?: string) => {
    // Mock moderation function
    console.log(`Moderating asset ${assetId} with action: ${action}`, reason);
    return Promise.resolve();
  };

  return { 
    usePublicAssets, 
    useModerationStats, 
    usePendingReports, 
    moderateAsset 
  };
}
