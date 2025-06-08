
import React, { useState, useEffect } from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCw, Download, Share2 } from 'lucide-react';
import { FullscreenViewerProps } from './types';

const FullscreenViewer: React.FC<FullscreenViewerProps> = ({ 
  card, 
  isOpen, 
  onClose 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !card) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={onClose} className="text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </div>

      <div className="absolute top-4 right-4 flex space-x-2">
        <Button variant="ghost" onClick={() => setIsFlipped(!isFlipped)} className="text-white">
          <RotateCw className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="text-white">
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="text-white">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative max-w-2xl max-h-[80vh] mx-4">
        <div 
          className={`relative aspect-[2.5/3.5] w-full rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 ${
            isFlipped ? 'transform rotateY-180' : ''
          }`}
        >
          <img 
            src={card.imageUrl} 
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-4 text-center text-white">
          <h2 className="text-2xl font-bold">{card.title}</h2>
          {card.description && (
            <p className="text-gray-300 mt-2">{card.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullscreenViewer;
