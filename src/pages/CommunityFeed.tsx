
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/utils/toastHelpers';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleError = () => {
    showToast.error("Error loading feed", "Failed to load community posts");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Community Feed</h1>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6 bg-gray-800 border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">No posts yet</h2>
            <p className="text-gray-400 mb-6">Be the first to share something with the community!</p>
            <Button onClick={handleError}>
              Load Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
