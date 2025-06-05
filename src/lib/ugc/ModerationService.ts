
export interface ModerationReport {
  id: string;
  assetId: string;
  reporterId: string;
  reason: string;
  details: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface ModerationStats {
  totalReports: number;
  pendingReports: number;
  pendingCount: number;
  openReports: number;
  approvedAssets: number;
  approvedCount: number;
  rejectedAssets: number;
  rejectedCount: number;
  flaggedAssets: number;
}

export class ModerationService {
  static async reportAsset(assetId: string, reason: string, details: string): Promise<ModerationReport> {
    // Mock implementation - in real app would make API call
    const report: ModerationReport = {
      id: `report-${Date.now()}`,
      assetId,
      reporterId: 'current-user-id',
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    return report;
  }

  static async appealRejection(assetId: string, appealText: string): Promise<void> {
    // Mock implementation
    console.log('Appeal submitted for asset:', assetId, appealText);
  }

  static async getModerationStats(): Promise<ModerationStats> {
    // Mock implementation
    return {
      totalReports: 42,
      pendingReports: 12,
      pendingCount: 12,
      openReports: 15,
      approvedAssets: 1205,
      approvedCount: 1205,
      rejectedAssets: 89,
      rejectedCount: 89,
      flaggedAssets: 15
    };
  }

  static async getPendingReports(limit: number = 20, offset: number = 0): Promise<ModerationReport[]> {
    // Mock implementation
    return [];
  }

  static async moderateAsset(
    assetId: string,
    status: 'approved' | 'rejected' | 'flagged',
    moderatorId: string,
    reason?: string,
    notes?: string
  ): Promise<void> {
    // Mock implementation
    console.log('Asset moderated:', { assetId, status, moderatorId, reason, notes });
  }
}
