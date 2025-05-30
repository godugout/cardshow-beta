
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamGalleryFiltersProps {
  activeLeague: string;
  setActiveLeague: (league: string) => void;
  activeDivision: string;
  setActiveDivision: (division: string) => void;
}

const TeamGalleryFilters: React.FC<TeamGalleryFiltersProps> = ({
  activeLeague,
  setActiveLeague,
  activeDivision,
  setActiveDivision
}) => {
  // Define available leagues and divisions
  const leagues = ['all', 'American League', 'National League'];
  const divisions = ['all', 'East', 'Central', 'West'];

  // Reset division to 'all' when league changes
  const handleLeagueChange = (league: string) => {
    setActiveLeague(league);
    if (league === 'all') {
      setActiveDivision('all');
    }
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-700">Filter:</span>
      </div>
      
      <div className="space-x-2">
        {leagues.map(league => (
          <Button 
            key={league}
            variant={activeLeague === league ? "default" : "outline"}
            size="sm"
            onClick={() => handleLeagueChange(league)}
          >
            {league === 'all' ? 'All Leagues' : league}
          </Button>
        ))}
      </div>
      
      {/* Only show divisions if a specific league is selected */}
      {activeLeague !== 'all' && (
        <div className="space-x-2">
          {divisions.map(division => (
            <Button 
              key={division}
              variant={activeDivision === division ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveDivision(division)}
            >
              {division === 'all' ? 'All Divisions' : division}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamGalleryFilters;
