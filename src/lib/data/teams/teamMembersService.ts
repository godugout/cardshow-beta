import { TeamMember } from '@/lib/types';
import { mapTeamMember } from './mappers';
import { supabase } from '@/integrations/supabase/client';

export const teamMembersService = {
  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    // Mock implementation
    return [];
  },

  async addTeamMember(teamId: string, userId: string, role: string): Promise<TeamMember> {
    const memberData = {
      id: `member-${Date.now()}`,
      teamId,
      userId,
      role,
      joinedAt: new Date().toISOString(),
      permissions: []
    };
    
    return mapTeamMember(memberData);
  },

  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    // Mock implementation
  },

  async updateTeamMemberRole(teamId: string, userId: string, role: string): Promise<TeamMember> {
    const memberData = {
      id: `member-${Date.now()}`,
      teamId,
      userId,
      role,
      joinedAt: new Date().toISOString(),
      permissions: []
    };
    
    return mapTeamMember(memberData);
  }
};

// Export individual functions for backward compatibility
export const getTeamMembers = teamMembersService.getTeamMembers;
export const addTeamMember = teamMembersService.addTeamMember;
export const updateTeamMemberRole = teamMembersService.updateTeamMemberRole;
export const removeTeamMember = teamMembersService.removeTeamMember;
