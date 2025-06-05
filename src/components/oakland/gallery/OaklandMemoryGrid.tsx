
import React from 'react';
import { Link } from 'react-router-dom';
import { OaklandMemoryData, Card } from '@/lib/types';
import { OaklandTemplateType } from '../OaklandCardTemplates';
import OaklandMemoryCard from '../OaklandMemoryCard';

interface OaklandMemoryGridProps {
  cards: Array<Card>;
}

const OaklandMemoryGrid: React.FC<OaklandMemoryGridProps> = ({ cards }) => {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map(card => {
        const oaklandMemory = card.designMetadata?.oaklandMemory;
        if (!oaklandMemory) return null;
        
        // Type assertion to ensure we have the correct type
        const typedMemory = oaklandMemory as OaklandMemoryData;
        
        const memoryData: OaklandMemoryData = {
          title: card.title || '',
          description: card.description,
          date: typedMemory.date,
          opponent: typedMemory.opponent,
          score: typedMemory.score,
          location: typedMemory.location,
          section: typedMemory.section,
          memoryType: typedMemory.memoryType,
          attendees: typedMemory.attendees || [],
          tags: card.tags || [],
          imageUrl: typedMemory.imageUrl || card.imageUrl || '',
          historicalContext: typedMemory.historicalContext,
          personalSignificance: typedMemory.personalSignificance,
        };
        
        return (
          <Link key={card.id} to={`/teams/oakland/memories/${card.id}`}>
            <OaklandMemoryCard 
              memory={memoryData}
              templateType={(typedMemory.template as OaklandTemplateType) || 'classic'}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default OaklandMemoryGrid;
