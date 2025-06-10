
import { TeamMember, Team } from '@/lib/types';

export const mapTeamMember = (data: any): TeamMember => ({
  id: data.id,
  userId: data.userId,
  teamId: data.teamId,
  role: data.role,
  joinedAt: data.joinedAt,
  permissions: data.permissions,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const mapTeamMembers = (data: any[]): TeamMember[] => {
  return data.map(mapTeamMember);
};

export const mapTeam = (data: any): Team => ({
  id: data.id,
  name: data.name,
  description: data.description,
  logoUrl: data.logoUrl || data.logo_url,
  ownerId: data.ownerId,
  isActive: data.isActive,
  visibility: data.visibility,
  banner_url: data.banner_url,
  status: data.status,
  website: data.website,
  email: data.email,
  specialties: data.specialties,
  primary_color: data.primary_color,
  secondary_color: data.secondary_color,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
});

export const mapTeams = (data: any[]): Team[] => {
  return data.map(mapTeam);
};
