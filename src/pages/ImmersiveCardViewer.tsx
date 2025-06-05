import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/lib/types/cardTypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Smartphone, Share2, Download } from 'lucide-react';
import { sampleCards } from '@/lib/data/sampleCards';
import { toast } from '@/hooks/use-toast';
import { adaptToCard } from '@/lib/adapters/cardAdapter';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';
import { DetailedViewCard, ensureDetailedViewCard } from '@/types/detailedCardTypes';
import PageLayout from '@/components/navigation/PageLayout';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475';

const ImmersiveCardViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError('No card ID provided');
      setLoading(false);
      return;
    }

    const fetchCard = async () => {
      try {
        // Simulate fetching card data
        const foundCard = sampleCards.find(c => c.id === id);

        if (foundCard) {
          setCard(foundCard);
        } else {
          setError('Card not found');
        }
      } catch (err) {
        setError('Failed to load card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleViewAR = () => {
    navigate(`/ar-card-viewer/${id}`);
  };

  const handleShare = async () => {
    toast({
      title: "Card shared",
      description: "Share link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <PageLayout title="Loading Card" description="Please wait...">
        <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-64 h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    toast({
      title: "Error loading card",
      description: "There was a problem loading the card details.",
    });

    return (
      <PageLayout title="Card Not Found" description="The requested card could not be found">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Card Not Found</h1>
            <p className="text-gray-600 mb-8">
              The card you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/cards')}>
              Browse All Cards
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={card?.title || "Card Detail"}
      description={card?.description || "View card details"}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 p-6 rounded-lg backdrop-blur-sm">
              <div className="relative mx-auto max-w-md">
                <div className="aspect-[2.5/3.5] w-full rounded-lg overflow-hidden border-2 border-gray-600/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleViewAR}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  View in AR
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 p-6 rounded-lg backdrop-blur-sm">
              <h1 className="text-2xl font-bold mb-2">{card.title}</h1>
              
              {card.description && (
                <p className="text-gray-300 mb-6">{card.description}</p>
              )}
              
              <div className="space-y-6">
                {card.player && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Player</h3>
                    <p className="text-white">{card.player}</p>
                  </div>
                )}
                
                {card.team && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Team</h3>
                    <p className="text-white">{card.team}</p>
                  </div>
                )}
                
                {card.year && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Year</h3>
                    <p className="text-white">{card.year}</p>
                  </div>
                )}
                
                {card.cardNumber && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Card #</h3>
                    <p className="text-white">{card.cardNumber}</p>
                  </div>
                )}
                
                {card.set && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Set</h3>
                    <p className="text-white">{card.set}</p>
                  </div>
                )}
                
                {card.cardType && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Type</h3>
                    <p className="text-white">{card.cardType}</p>
                  </div>
                )}
              </div>
              
              {/* Card Stats */}
              {card.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.views}</div>
                    <div className="text-gray-400 text-sm">Views</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.likes}</div>
                    <div className="text-gray-400 text-sm">Likes</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.downloads}</div>
                    <div className="text-gray-400 text-sm">Downloads</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.shares}</div>
                    <div className="text-gray-400 text-sm">Shares</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.comments}</div>
                    <div className="text-gray-400 text-sm">Comments</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.favorites}</div>
                    <div className="text-gray-400 text-sm">Favorites</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{card.stats.rating}</div>
                    <div className="text-gray-400 text-sm">Rating</div>
                  </div>
                </div>
              )}
              
              {card.tags && card.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {card.effects && card.effects.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Special Effects</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.effects.map((effect, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-800/30 border border-purple-500/30 text-purple-300 text-xs rounded-full"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ImmersiveCardViewer;
