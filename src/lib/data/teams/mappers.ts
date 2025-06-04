
import { Team, TeamMember } from '@/lib/types/teamTypes';

export function mapTeamToSupabase(team: Partial<Team>) {
  return {
    name: team.name,
    description: team.description,
    logo_url: team.logoUrl,
    banner_url: team.bannerUrl,
    owner_id: team.ownerId,
    primary_color: team.primaryColor,
    secondary_color: team.secondaryColor,
    tags: team.tags,
    website: team.website,
    email: team.email,
    status: team.status,
    visibility: team.visibility,
    specialties: team.specialties,
    settings: team.settings
  };
}

export function mapTeamFromSupabase(data: any): Team {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    logoUrl: data.logo_url,
    bannerUrl: data.banner_url,
    ownerId: data.owner_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    primaryColor: data.primary_color,
    secondaryColor: data.secondary_color,
    tags: data.tags || [],
    website: data.website,
    email: data.email,
    status: data.status || 'active',
    visibility: data.visibility || 'public',
    specialties: data.specialties || [],
    settings: data.settings || {}
  };
}

export function mapTeamMemberFromSupabase(data: any): TeamMember {
  return {
    id: data.id,
    userId: data.user_id,
    teamId: data.team_id,
    role: data.role,
    joinedAt: data.joined_at,
    permissions: data.permissions || []
  };
}
