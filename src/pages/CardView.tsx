import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardEffect } from '@/lib/types';
import { cardEffectsToStringArray } from '@/lib/utils/cardEffectHelpers';
import PageLayout from '@/components/navigation/PageLayout';
import { Button } from '@/components/ui/button';
import { Share2, Download, Heart, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCards } from '@/context/CardContext';
import CardViewer from '@/components/card-viewer/CardViewer';
import CardDetails from '@/components/cards/CardDetails';
import RelatedCards from '@/components/cards/RelatedCards';
import { toast } from 'sonner';

const CardView = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const { getCard } = useCards();

  useEffect(() => {
    if (!id) {
      setError('No card ID provided');
      setIsLoading(false);
      return;
    }

    try {
      const cardData = getCard(id);
      if (cardData) {
        setCard(cardData);
        // Check if card is in favorites (could be from localStorage or API)
        const favorites = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
        setIsFavorited(favorites.includes(id));
      } else {
        setError('Card not found');
      }
    } catch (err) {
      console.error('Error fetching card:', err);
      setError('Failed to load card');
    } finally {
      setIsLoading(false);
    }
  }, [id, getCard]);

  const getEffectClasses = (effects: CardEffect[]) => {
    return cardEffectsToStringArray(effects)
      .map(effect => `effect-${effect.toLowerCase()}`)
      .join(' ');
  };

  const handleShare = () => {
    if (navigator.share && card) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
        toast.error('Failed to share card');
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleDownload = () => {
    if (!card) return;
    
    // This is a placeholder for actual download functionality
    toast.success('Card download started');
    
    // In a real app, you would generate a downloadable image or PDF here
    setTimeout(() => {
      toast.info('Download feature coming soon!');
    }, 1000);
  };

  const toggleFavorite = () => {
    if (!card) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteCards') || '[]');
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter((favId: string) => favId !== id);
      localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
      toast.success('Removed from favorites');
    } else {
      favorites.push(id);
      localStorage.setItem('favoriteCards', JSON.stringify(favorites));
      setIsFavorited(true);
      toast.success('Added to favorites');
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Loading Card" description="Please wait...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !card) {
    return (
      <PageLayout title="Error" description="Could not load card">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Card not found'}
          </h2>
          <Button onClick={() => navigate('/cards')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cards
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={card.title}
      description={card.description}
      showBackButton
      backButtonUrl="/cards"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
              <CardViewer 
                card={card} 
                effectClasses={getEffectClasses(card.effects)}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-center mt-6 space-x-4">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button 
                variant={isFavorited ? "default" : "outline"}
                onClick={toggleFavorite}
              >
                {isFavorited ? (
                  <>
                    <Heart className="mr-2 h-4 w-4 fill-current" /> Favorited
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" /> Add to Favorites
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Card Details */}
          <div>
            <CardDetails card={card} />
          </div>
        </div>
        
        {/* Related Cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" /> Related Cards
          </h2>
          <RelatedCards currentCardId={card.id} tags={card.tags} />
        </div>
      </div>
    </PageLayout>
  );
};

export default CardView;
