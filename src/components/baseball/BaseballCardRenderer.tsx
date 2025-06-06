import React from 'react';
import { useBaseballCard } from './hooks/useBaseballCard';
import CardContainer from './components/CardContainer';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BaseballCardRenderer: React.FC = () => {
  const { cardData, isLoading, error, allCards } = useBaseballCard();
  const navigate = useNavigate();

  // For debugging
  console.log("BaseballCardRenderer state:", { 
    cardData, 
    isLoading, 
    error, 
    allCardsCount: allCards.length 
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-64 h-96 bg-gray-800 rounded-lg"></div>
          <div className="mt-4 h-4 bg-gray-800 rounded w-48"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !cardData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-gray-800/50 p-8 rounded-lg flex flex-col items-center max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Card Not Found</h2>
          <p className="text-gray-300 mb-6">{error || "The requested baseball card couldn't be loaded."}</p>
          {allCards.length > 0 && (
            <Button 
              onClick={() => navigate('/cards/auctions/' + allCards[0].id)}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              View Available Cards
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full z-10">
      <CardContainer cardData={cardData} allCards={allCards} />
    </div>
  );
};

export default BaseballCardRenderer;
