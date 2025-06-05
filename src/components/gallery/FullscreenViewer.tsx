
import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/lib/types';
import { DEFAULT_CARD_STYLE, DEFAULT_TEXT_STYLE } from '@/components/card-templates/TemplateTypes';

interface FullscreenViewerProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenViewer: React.FC<FullscreenViewerProps> = ({ card, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  // Create a normalized card object with proper defaults
  const normalizedCard = {
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
      cardStyle: card.designMetadata?.cardStyle || DEFAULT_CARD_STYLE,
      textStyle: card.designMetadata?.textStyle || DEFAULT_TEXT_STYLE,
      marketMetadata: card.designMetadata?.marketMetadata || {
        isPrintable: false,
        isForSale: false,
        includeInCatalog: false
      },
      cardMetadata: {
        category: card.designMetadata?.cardMetadata?.category || 'general',
        cardType: card.designMetadata?.cardMetadata?.cardType || 'standard',
        series: card.designMetadata?.cardMetadata?.series || 'base'
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button variant="secondary" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleRotate}>
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Card Display */}
      <div className="flex items-center justify-center w-full h-full p-8">
        <div
          className="transition-transform duration-200 ease-in-out"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
        >
          <div 
            className="aspect-[2.5/3.5] max-w-2xl rounded-lg shadow-2xl overflow-hidden"
            style={{
              backgroundColor: normalizedCard.designMetadata.cardStyle.backgroundColor,
              borderColor: normalizedCard.designMetadata.cardStyle.borderColor,
              borderWidth: `${normalizedCard.designMetadata.cardStyle.borderWidth}px`,
              borderRadius: normalizedCard.designMetadata.cardStyle.borderRadius
            }}
          >
            {normalizedCard.imageUrl && (
              <img
                src={normalizedCard.imageUrl}
                alt={normalizedCard.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{normalizedCard.title}</h2>
        {normalizedCard.description && (
          <p className="text-gray-300 mb-2">{normalizedCard.description}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {normalizedCard.tags?.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

export default FullscreenViewer;
