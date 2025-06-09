
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCards } from '@/context/CardContext';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share2, Download } from 'lucide-react';
import { toast } from 'sonner';
import CardViewer from '@/components/card-viewer/CardViewer';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cards, updateCard, deleteCard } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundCard = cards.find(c => c.id === id);
      if (foundCard) {
        setCard(foundCard);
      } else {
        toast.error('Card not found');
        navigate('/gallery');
      }
    }
    setIsLoading(false);
  }, [id, cards, navigate]);

  const handleEdit = () => {
    if (card) {
      navigate(`/editor/${card.id}`);
    }
  };

  const handleDelete = async () => {
    if (card && window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(card.id);
        toast.success('Card deleted successfully');
        navigate('/gallery');
      } catch (error) {
        toast.error('Failed to delete card');
      }
    }
  };

  const cardForViewer = card ? {
    id: card.id,
    title: card.title,
    description: card.description,
    imageUrl: card.imageUrl,
    thumbnailUrl: card.thumbnailUrl,
    tags: card.tags,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    userId: card.userId,
    effects: card.effects,
    designMetadata: {
      cardStyle: card.designMetadata?.cardStyle || {},
      textStyle: card.designMetadata?.textStyle || {},
      marketMetadata: card.designMetadata?.marketMetadata || {},
      cardMetadata: {
        category: card.designMetadata?.cardMetadata?.category || 'general',
        cardType: card.designMetadata?.cardMetadata?.cardType || 'standard',
        series: card.designMetadata?.cardMetadata?.series || 'base',
      }
    }
  } : null;

  const handleSave = async (updatedCard: Card) => {
    try {
      await updateCard(updatedCard.id, updatedCard);
      setCard(updatedCard);
      toast.success('Card updated successfully');
    } catch (error) {
      toast.error('Failed to update card');
    }
  };

  const handleShare = () => {
    if (navigator.share && card) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href
      });
    } else if (card) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleDownload = () => {
    if (card) {
      const link = document.createElement('a');
      link.href = card.imageUrl;
      link.download = `${card.title}.jpg`;
      link.click();
      toast.success('Card downloaded');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!card || !cardForViewer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Card not found</h2>
          <Button onClick={() => navigate('/gallery')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Card Viewer */}
        <CardViewer
          card={cardForViewer}
          isOpen={true}
          onClose={() => navigate('/gallery')}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default CardDetail;
