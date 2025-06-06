
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Card } from '@/lib/types/cardTypes';
import CardItem from '@/components/CardItem';
import { toast } from 'sonner';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';

const CommunityFeed: React.FC = () => {
  const { user } = useAuth();
  const [feed, setFeed] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data - replace with actual API call later
        const mockFeed: Card[] = [
          {
            id: 'community-1',
            title: 'Amazing Baseball Card',
            description: 'Check out this rare find!',
            imageUrl: 'https://placekitten.com/200/300',
            thumbnailUrl: 'https://placekitten.com/200/300',
            tags: ['baseball', 'rare'],
            userId: 'user123',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            effects: [],
            reactions: [
              {
                id: 'reaction1',
                userId: 'user2',
                type: 'like',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                targetType: 'card',
                targetId: 'community-1'
              }
            ],
            designMetadata: DEFAULT_DESIGN_METADATA
          },
          {
            id: 'community-2',
            title: 'Vintage Football Card',
            description: 'Just pulled this from an old collection.',
            imageUrl: 'https://placekitten.com/200/301',
            thumbnailUrl: 'https://placekitten.com/200/301',
            tags: ['football', 'vintage'],
            userId: 'user456',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            effects: [],
            reactions: [],
            designMetadata: DEFAULT_DESIGN_METADATA
          }
        ];
        
        setFeed(mockFeed);
      } catch (err: any) {
        console.error('Error fetching feed:', err);
        setError(err.message || 'Failed to load feed');
        toast.error('Failed to load community feed');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeed();
  }, [user]);
  
  if (isLoading) {
    return <div>Loading feed...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Community Feed</h1>
      {feed.map(card => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CommunityFeed;
