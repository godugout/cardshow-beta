
import React, { useState } from 'react';
import CardUpload from './home/CardUpload';
import CardCollection from './home/CardCollection';
import CardShowcase from './home/CardShowcase';
import { cardData } from '@/data/cardData';
import { adaptToCard } from '@/lib/adapters/cardAdapter';

const OldCardCreator: React.FC = () => {
  const [view, setView] = useState<'showcase' | 'collection' | 'upload'>('collection');
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const selectCard = (card: any) => {
    const index = cardData.findIndex(c => c.id === card.id);
    setActiveCard(index >= 0 ? index : 0);
  };
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Convert cardData to core Card format
  const adaptedCardData = cardData.map(card => adaptToCard(card));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {view === 'upload' && (
        <CardUpload setView={setView} />
      )}
      
      {view === 'collection' && (
        <CardCollection 
          cards={adaptedCardData} 
          onCardClick={selectCard} 
          className=""
        />
      )}
      
      {view === 'showcase' && (
        <CardShowcase 
          cardData={adaptedCardData}
          activeCard={activeCard}
          isFlipped={isFlipped}
          selectCard={selectCard}
          flipCard={flipCard}
          setView={setView}
        />
      )}
    </div>
  );
};

export default OldCardCreator;
