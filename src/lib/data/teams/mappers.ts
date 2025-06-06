
import { TeamMember } from '@/lib/types';

export const mapTeamMemberData = (data: any): TeamMember => {
  return {
    id: data.id,
    userId: data.userId,
    teamId: data.teamId,
    role: data.role || 'member',
    joinedAt: data.joinedAt || new Date().toISOString(),
    permissions: data.permissions || []
  };
};
