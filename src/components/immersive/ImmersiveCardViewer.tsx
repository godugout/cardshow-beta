
import React from 'react';

interface ImmersiveCardViewerProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  effects?: string[];
  isFlipped?: boolean;
  isAutoRotating?: boolean;
}

const ImmersiveCardViewer: React.FC<ImmersiveCardViewerProps> = ({
  imageUrl,
  title,
  description,
  effects = [],
  isFlipped = false,
  isAutoRotating = false
}) => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className={`relative w-80 h-112 perspective-1000 ${isAutoRotating ? 'animate-pulse' : ''}`}>
        <div 
          className={`w-full h-full transition-transform duration-700 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className={`w-full h-full rounded-xl overflow-hidden shadow-2xl ${effects.join(' ')}`}>
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title || 'Card'} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          
          {/* Back of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveCardViewer;
