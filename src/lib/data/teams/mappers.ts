
import { TeamMember, Team } from '@/lib/types/index';

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

export const mapTeamFromDb = (data: any): Team => {
  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    ownerId: data.owner_id || data.ownerId,
    visibility: data.visibility || 'private',
    logoUrl: data.logo_url,
    logo_url: data.logo_url,
    banner_url: data.banner_url,
    status: data.status,
    website: data.website,
    email: data.email,
    specialties: data.specialties,
    primary_color: data.primary_color,
    secondary_color: data.secondary_color,
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString()
  };
};

export const mapTeamMemberFromDb = (data: any): TeamMember => {
  return mapTeamMemberData(data);
};
