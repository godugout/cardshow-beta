
import React, { useState } from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';
import { Button } from '@/components/ui/button';
import { X, RotateCw, Download, Share2 } from 'lucide-react';

interface CardViewerProps {
  card?: Card;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  isFlipped?: boolean; // Add missing prop
  flipCard?: () => void; // Add missing prop
  onBackToCollection?: () => void; // Add missing prop
  activeEffects?: string[]; // Add missing prop
  onSnapshot?: () => void; // Add missing prop
}

const CardViewer: React.FC<CardViewerProps> = ({ 
  card, 
  isOpen, 
  onClose, 
  className = '',
  isFlipped = false,
  flipCard,
  onBackToCollection,
  activeEffects = [],
  onSnapshot
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  
  const handleFlip = () => {
    if (flipCard) {
      flipCard();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  const actualIsFlipped = flipCard ? isFlipped : internalFlipped;

  if (!isOpen || !card) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 ${className}`}>
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Controls */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button variant="ghost" size="sm" onClick={handleFlip}>
            <RotateCw className="h-4 w-4" />
          </Button>
          {onSnapshot && (
            <Button variant="ghost" size="sm" onClick={onSnapshot}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Card Display */}
        <div className="bg-white rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative aspect-[2.5/3.5] max-w-md mx-auto">
              <img 
                src={card.imageUrl} 
                alt={card.title}
                className={`w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ${
                  actualIsFlipped ? 'transform rotateY-180' : ''
                } ${activeEffects.join(' ')}`}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{card.title}</h2>
                <p className="text-gray-600">
                  {card.player || card.name || 'Unknown Player'}
                </p>
              </div>
              
              {card.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{card.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Team:</span> {card.team || 'Unknown'}</p>
                  <p><span className="font-medium">Year:</span> {card.year || 'Unknown'}</p>
                </div>
                <div>
                  <p><span className="font-medium">Jersey:</span> {card.jersey || 'N/A'}</p>
                  <p><span className="font-medium">Rarity:</span> {card.rarity || 'Common'}</p>
                </div>
              </div>
              
              {card.tags && card.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {onBackToCollection && (
                <div className="pt-4">
                  <Button onClick={onBackToCollection} variant="outline">
                    Back to Collection
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardViewer;
