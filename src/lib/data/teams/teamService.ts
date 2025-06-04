import { Team, TeamMember } from '@/lib/types/teamTypes';
import { supabase } from '@/integrations/supabase/client';

export const teamService = {
  async createTeam(teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    const { data, error } = await supabase
      .from('teams')
      .insert({
        name: teamData.name,
        description: teamData.description,
        owner_id: teamData.ownerId,
        logo_url: teamData.logoUrl,
        banner_url: teamData.bannerUrl,
        primary_color: teamData.primaryColor,
        secondary_color: teamData.secondaryColor,
        tags: teamData.tags || [],
        website: teamData.website,
        email: teamData.email,
        status: teamData.status || 'active',
        visibility: teamData.visibility || 'public',
        specialties: teamData.specialties || [],
        settings: teamData.settings || {}
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapTeamFromDb(data);
  },

  async updateTeam(id: string, updates: Partial<Team>): Promise<Team> {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.logoUrl !== undefined) updateData.logo_url = updates.logoUrl;
    if (updates.bannerUrl !== undefined) updateData.banner_url = updates.bannerUrl;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.website) updateData.website = updates.website;
    if (updates.email) updateData.email = updates.email;
    if (updates.status) updateData.status = updates.status;
    if (updates.visibility) updateData.visibility = updates.visibility;
    if (updates.primaryColor) updateData.primary_color = updates.primaryColor;
    if (updates.secondaryColor) updateData.secondary_color = updates.secondaryColor;
    if (updates.specialties) updateData.specialties = updates.specialties;
    if (updates.settings) updateData.settings = updates.settings;

    const { data, error } = await supabase
      .from('teams')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapTeamFromDb(data);
  },

  async getTeamById(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team:', error);
      return null;
    }

    return this.mapTeamFromDb(data);
  },

  async getAllTeams(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*');

    if (error) {
      console.error('Error fetching teams:', error);
      return [];
    }

    return data.map(this.mapTeamFromDb);
  },

  async deleteTeam(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team:', error);
      return false;
    }

    return true;
  },

  mapTeamFromDb(dbTeam: any): Team {
    return {
      id: dbTeam.id,
      name: dbTeam.name,
      description: dbTeam.description,
      logoUrl: dbTeam.logo_url,
      bannerUrl: dbTeam.banner_url,
      ownerId: dbTeam.owner_id,
      createdAt: dbTeam.created_at,
      updatedAt: dbTeam.updated_at,
      primaryColor: dbTeam.primary_color,
      secondaryColor: dbTeam.secondary_color,
      tags: dbTeam.tags || [],
      website: dbTeam.website,
      email: dbTeam.email,
      status: dbTeam.status,
      visibility: dbTeam.visibility,
      specialties: dbTeam.specialties || [],
      settings: dbTeam.settings || {}
    };
  }
};
