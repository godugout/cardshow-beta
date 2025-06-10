
export * from './mappers';
export * from './teamService';
export * from './teamMembersService';

// Re-export with correct names for backward compatibility
export { 
  mapTeam as mapTeamFromDb,
  mapTeamMember as mapTeamMemberFromDb 
} from './mappers';

export { 
  teamService,
  teamService as teamAPI
} from './teamService';

// Export individual service methods for convenience
export const {
  getTeam: getTeamById,
  getTeams: getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam
} = teamService;
