
import { supabase } from '@/lib/supabase';
import { Team } from '@/lib/types/teamTypes';

export const teamRepository = {
  async getTeamsByUser(userId: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from('crd_teams')
      .select('*')
      .eq('owner_id', userId);

    if (error) {
      console.error('Error fetching teams:', error);
      return [];
    }

    return data?.map(team => ({
      id: team.id,
      name: team.name,
      ownerId: team.owner_id,
      description: team.description,
      logoUrl: team.logo_url,
      createdAt: team.created_at,
      updatedAt: team.updated_at,
      visibility: 'public' as const,
      logo_url: team.logo_url,
      primary_color: team.primary_color,
      secondary_color: team.secondary_color,
      tertiary_color: team.tertiary_color
    })) || [];
  },

  async createTeam(name: string, ownerId: string): Promise<Team | null> {
    // Implementation would be handled by the teams service
    console.log('Creating team:', name, 'for user:', ownerId);
    return null;
  }
};

export default teamRepository;
