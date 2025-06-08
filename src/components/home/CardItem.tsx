
import React from 'react';
import { Card } from '@/lib/types/unifiedCardTypes';

interface CardItemProps {
  card: Card;
  onClick?: () => void;
  className?: string;
  isActive?: boolean; // Add missing prop
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick, className = '', isActive = false }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${isActive ? 'ring-2 ring-blue-500' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="aspect-[2.5/3.5] overflow-hidden">
        <img 
          src={card.imageUrl} 
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{card.title}</h3>
        <p className="text-xs text-gray-600">
          {card.player || card.name || 'Unknown'}
        </p>
        <p className="text-xs text-gray-500">
          Jersey: {card.jersey || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default CardItem;
