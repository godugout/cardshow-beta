
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/lib/types/cardTypes';

interface FullscreenViewerProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const FullscreenViewer: React.FC<FullscreenViewerProps> = ({
  card,
  isOpen,
  onClose,
  onNext,
  onPrevious
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDownload = () => {
    if (card.imageUrl) {
      const link = document.createElement('a');
      link.href = card.imageUrl;
      link.download = `${card.title || 'card'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!isOpen) return null;

  // Create a compatible card object for display
  const displayCard = {
    id: card.id,
    title: card.title,
    description: card.description || '',
    imageUrl: card.imageUrl || '',
    thumbnailUrl: card.thumbnailUrl || '',
    tags: card.tags || [],
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    userId: card.userId || '',
    effects: card.effects || [],
    designMetadata: {
      cardStyle: card.designMetadata?.cardStyle || {},
      textStyle: card.designMetadata?.textStyle || {},
      marketMetadata: card.designMetadata?.marketMetadata || {},
      cardMetadata: {
        category: card.designMetadata?.cardMetadata?.category || 'general',
        cardType: card.designMetadata?.cardMetadata?.cardType || 'standard',
        series: card.designMetadata?.cardMetadata?.series || 'base'
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Navigation and controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="icon" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Previous button */}
      {onPrevious && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Next button */}
      {onNext && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
          onClick={onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Main image */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="max-w-full max-h-full object-contain"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Card info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
        {card.description && (
          <p className="text-sm opacity-90 mb-2">{card.description}</p>
        )}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenViewer;
