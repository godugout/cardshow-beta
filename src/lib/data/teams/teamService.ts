
import { Team, TeamMember } from '@/lib/types';
import { mapTeam, mapTeams, mapTeamMember, mapTeamMembers } from './mappers';
import { supabase } from '@/integrations/supabase/client';

export const teamService = {
  async getTeams(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }

    return mapTeams(data || []);
  },

  async getTeam(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team:', error);
      return null;
    }

    return data ? mapTeam(data) : null;
  },

  async getUserTeams(userId: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        teams (*)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user teams:', error);
      throw error;
    }

    return mapTeams(data?.map(item => item.teams).filter(Boolean) || []);
  },

  async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    const insertData = {
      name: teamData.name,
      description: teamData.description,
      logo_url: teamData.logoUrl, // Use snake_case for database
      owner_id: teamData.ownerId, // Use snake_case for database
      is_active: teamData.isActive,
      visibility: teamData.visibility,
      banner_url: teamData.banner_url,
    };

    const { data, error } = await supabase
      .from('teams')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error creating team:', error);
      throw error;
    }

    return mapTeam(data);
  },

  async updateTeam(id: string, updates: Partial<Team>): Promise<Team> {
    const updateData: Record<string, any> = {
      name: updates.name,
      description: updates.description,
      logo_url: updates.logoUrl, // Use snake_case for database
      is_active: updates.isActive,
      visibility: updates.visibility,
      banner_url: updates.banner_url,
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const { data, error } = await supabase
      .from('teams')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team:', error);
      throw error;
    }

    return mapTeam(data);
  },

  async deleteTeam(id: string): Promise<void> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  },

  // Team member methods
  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', teamId);

    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }

    return mapTeamMembers(data || []);
  },

  async addTeamMember(teamId: string, userId: string, role: 'owner' | 'admin' | 'member' = 'member'): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{
        team_id: teamId,
        user_id: userId,
        role,
        joined_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding team member:', error);
      throw error;
    }

    return mapTeamMember(data);
  },

  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  },

  async updateTeamMemberRole(teamId: string, userId: string, role: 'owner' | 'admin' | 'member'): Promise<TeamMember> {
    const { data, error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member role:', error);
      throw error;
    }

    return mapTeamMember(data);
  }
};
