
import React from 'react';
import { Card } from '@/lib/types/cardTypes';
import { DEFAULT_CARD_STYLE, DEFAULT_TEXT_STYLE } from '@/lib/types/cardTypes';

interface CardPreviewProps {
  cardData: Card;
  className?: string;
  effectClasses?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardData, className = '', effectClasses = '' }) => {
  // Use default values if designMetadata is not available
  const cardStyle = cardData.designMetadata?.cardStyle || DEFAULT_CARD_STYLE;
  const textStyle = cardData.designMetadata?.textStyle || DEFAULT_TEXT_STYLE;

  const cardStyles = {
    backgroundColor: cardData.backgroundColor || cardStyle.backgroundColor,
    borderRadius: cardData.borderRadius || cardStyle.borderRadius,
    borderColor: cardData.borderColor || cardStyle.borderColor,
    color: textStyle.titleColor,
    fontWeight: textStyle.titleWeight,
    textAlign: textStyle.titleAlignment as 'left' | 'center' | 'right',
    '--description-color': textStyle.descriptionColor,
  } as React.CSSProperties;

  return (
    <div className={`card-preview ${className} ${effectClasses}`}>
      <div 
        className="w-64 h-96 rounded-lg border-2 shadow-lg p-4 flex flex-col"
        style={cardStyles}
      >
        {cardData.imageUrl && (
          <div className="flex-1 mb-4">
            <img 
              src={cardData.imageUrl} 
              alt="Card preview"
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
        
        <div className="space-y-2">
          {cardData.title && (
            <h3 className="text-lg font-bold truncate">
              {cardData.title}
            </h3>
          )}
          
          {cardData.description && (
            <p 
              className="text-sm opacity-90 line-clamp-3"
              style={{ color: textStyle.descriptionColor }}
            >
              {cardData.description}
            </p>
          )}
          
          {cardData.tags && cardData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {cardData.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-black/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
