import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, Share2, Edit, Download, Eye } from 'lucide-react';
import { useCards } from '@/context/CardContext';
import { Card } from '@/lib/types/unifiedCardTypes';
import { DEFAULT_DESIGN_METADATA } from '@/lib/utils/cardDefaults';
import { toast } from 'sonner';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cards, updateCard } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id && cards.length > 0) {
      const foundCard = cards.find(c => c.id === id);
      if (foundCard) {
        setCard(foundCard);
      } else {
        // Create a mock card with proper structure
        const mockCard: Card = {
          id: id,
          title: 'Sample Card',
          description: 'This is a sample card',
          imageUrl: '/placeholder.svg',
          thumbnailUrl: '/placeholder.svg',
          tags: ['sample'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 'sample-user',
          effects: [],
          designMetadata: DEFAULT_DESIGN_METADATA
        };
        setCard(mockCard);
      }
      setLoading(false);
    }
  }, [id, cards]);

  const handleFavorite = async () => {
    if (!card) return;
    
    try {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error updating favorite:', error);
      toast.error('Failed to update favorite');
    }
  };

  const handleShare = async () => {
    if (!card) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    }
  };

  const handleEdit = () => {
    if (card) {
      updateCard(card.id, card);
      navigate(`/cards/edit/${card.id}`);
    }
  };

  const handleDownload = () => {
    if (card) {
      const link = document.createElement('a');
      link.href = card.imageUrl;
      link.download = `${card.title}.png`;
      link.click();
    }
  };

  const handleArView = () => {
    if (card) {
      navigate(`/ar-viewer?card=${card.id}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <Button onClick={() => navigate('/gallery')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[2.5/3.5] relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleFavorite} variant="outline" size="sm">
              <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handleArView} variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              AR View
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{card.title}</h1>
            <p className="text-muted-foreground">{card.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {card.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <UICard>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(card.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated:</span>
                <span>{new Date(card.updatedAt).toLocaleDateString()}</span>
              </div>
              {card.effects && card.effects.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effects:</span>
                  <span>{card.effects.join(', ')}</span>
                </div>
              )}
            </CardContent>
          </UICard>

          <div className="flex gap-2">
            <Button onClick={handleEdit} className="flex-1">
              <Edit className="mr-2 h-4 w-4" />
              Edit Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
