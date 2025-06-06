
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

export const mapTeamFromDb = (data: any) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString()
  };
};

export const mapTeamMemberFromDb = (data: any): TeamMember => {
  return mapTeamMemberData(data);
};
