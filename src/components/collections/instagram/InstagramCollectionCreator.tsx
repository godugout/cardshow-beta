import React, { useState } from 'react';
import PageLayout from '@/components/navigation/PageLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useCollectionOperations } from '@/context/card/hooks/useCollectionOperations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

const InstagramCollectionCreator = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createCollection } = useCollectionOperations();

  const fetchInstagramPosts = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsLoading(true);
    try {
      // Mock data for demo purposes
      const mockPosts: InstagramPost[] = [
        {
          id: '1',
          mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          caption: 'Amazing sunset view',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        },
        {
          id: '2',
          mediaUrl: 'https://images.unsplash.com/photo-1546519638-68e109acd27d',
          caption: 'City lights at night',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        }
      ];
      
      setPosts(mockPosts);
      toast.success(`Found ${mockPosts.length} posts`);
    } catch (error) {
      toast.error('Failed to fetch Instagram posts');
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCollectionFromPosts = async () => {
    if (posts.length === 0) {
      toast.error('No posts to create collection from');
      return;
    }

    try {
      const newCollection = await createCollection({
        name: `${username}'s Instagram Collection`,
        description: `Collection created from @${username}'s Instagram posts`,
        coverImageUrl: posts[0]?.mediaUrl,
        visibility: 'public',
        allowComments: true,
        tags: ['instagram', 'social'],
        featured: false
        // Note: removed 'instagramSource' as it's not in the Collection type
      });
      
      toast.success('Collection created successfully!');
    } catch (error) {
      toast.error('Failed to create collection');
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import from Instagram</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Instagram Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={fetchInstagramPosts} 
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Fetch Posts'}
          </Button>
        </CardContent>
      </Card>

      {posts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Found Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square">
                  <img 
                    src={post.mediaUrl} 
                    alt={post.caption}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            <Button onClick={createCollectionFromPosts}>
              Create Collection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstagramCollectionCreator;
